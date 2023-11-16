import React from 'react'

import { ScreenName } from '.'

import { SettingsContext, SettingsContextObject } from '../../contexts/settings'
import { formatedQuestions, FormatedQuestion } from '../../data/questions'

import './PlayField.scss'
import ScoreCounter from '../ScoreCounter'

export default function PlayField({
  setCurrentScreen,
  active,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<ScreenName>>
  active: boolean
}) {
  const settings = React.useContext<SettingsContextObject>(SettingsContext)
  const [gameScore, setGameScore] = React.useState<number>(0)

  const validQuestions = React.useMemo<
    FormatedQuestion[]
  >((): FormatedQuestion[] => {
    const res: FormatedQuestion[] = []

    if (settings.settings.romajiQuestions) {
      res.push(...formatedQuestions.romaji)
    }

    if (settings.settings.hiraganaQuestions) {
      res.push(...formatedQuestions.hiragana)
    }

    if (settings.settings.katakanaQuestions) {
      res.push(...formatedQuestions.katakana)
    }

    return res
  }, [
    settings.settings.romajiQuestions,
    settings.settings.hiraganaQuestions,
    settings.settings.katakanaQuestions,
  ])

  const generateNewQuestion = React.useCallback(
    (): FormatedQuestion =>
      validQuestions[Math.floor(Math.random() * validQuestions.length)],
    [validQuestions]
  )

  const [currentQuestion, setCurrentQuestion] =
    React.useState<FormatedQuestion>(
      (): FormatedQuestion => generateNewQuestion()
    )

  const [health, setHealth] = React.useState<number>(settings.settings.lives)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const countdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()

    if (!active) return

    let firstTime: number
    let countdownAnimationFrameHandler: number

    const countdownAnimationFrameRequest = (time: number): void => {
      if (countdownRef.current === null) {
        countdownAnimationFrameHandler = requestAnimationFrame(
          countdownAnimationFrameRequest
        )

        return
      }

      if (!firstTime) firstTime = time
      const elapsedTime: number = time - firstTime

      // TODO: Determine animation length based upon settings + fail state on end
      const completedPercentage =
        Math.max((10000 - elapsedTime) / 10000, 0) * 100

      countdownRef.current.style.width = `${completedPercentage}%`

      if (completedPercentage) {
        countdownAnimationFrameHandler = requestAnimationFrame(
          countdownAnimationFrameRequest
        )
      }
    }

    countdownAnimationFrameHandler = requestAnimationFrame(
      countdownAnimationFrameRequest
    )

    return () => cancelAnimationFrame(countdownAnimationFrameHandler)
  }, [active, settings.settings.speed])

  React.useEffect(() => {
    if (health === 0) {
      setCurrentScreen('GameOver')
    }
  }, [health, setCurrentScreen])

  const onAnswerSubmit = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter' && event.code !== 'Enter') return

      const userAnswer = event.currentTarget.value

      if (
        (settings.settings.romajiAnswers &&
          currentQuestion.romaji === userAnswer) ||
        (settings.settings.hiraganaAnswers &&
          currentQuestion.hiragana === userAnswer) ||
        (settings.settings.katakanaAnswers &&
          currentQuestion.katakana === userAnswer)
      ) {
        setCurrentQuestion(generateNewQuestion())
        setGameScore((prevScore) => (prevScore += 100))
        if (inputRef.current) inputRef.current.value = ''
      } else {
        setHealth((prevHealth) => prevHealth - 1)
        setGameScore((prevScore) => Math.max(prevScore - 100, 0))
      }
    },
    [
      settings.settings.romajiAnswers,
      settings.settings.hiraganaAnswers,
      settings.settings.katakanaAnswers,
      currentQuestion,
      generateNewQuestion,
    ]
  )

  return (
    <div className="game-play-field-wrapper">
      <div className="game-countdown-timer" ref={countdownRef}></div>
      <div className="game-play-field">
        <div className="game-question japanese">
          {currentQuestion[currentQuestion.selected]}
        </div>
        <div className="game-input">
          <div className="carrot mono">&gt;</div>
          <input
            type="text"
            className="game-input-answer"
            maxLength={3}
            autoFocus
            autoComplete="off"
            onKeyUp={onAnswerSubmit}
            ref={inputRef}
          />
        </div>
        <div className="game-input-underline"></div>
        <ScoreCounter score={gameScore} />
      </div>
      <div className="game-heart-container">
        <div className={`game-heart ${health < 1 ? 'down' : ''}`}>
          <i className="fa fa-heart" aria-hidden="true"></i>
        </div>
        {settings.settings.lives > 1 && (
          <div className={`game-heart ${health < 2 ? 'down' : ''}`}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
        )}
        {settings.settings.lives > 2 && (
          <div className={`game-heart ${health < 3 ? 'down' : ''}`}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
        )}
        {settings.settings.lives > 3 && (
          <div className={`game-heart ${health < 4 ? 'down' : ''}`}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
        )}
        {settings.settings.lives > 4 && (
          <div className={`game-heart ${health > 5 && 'down'}`}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
        )}
      </div>
    </div>
  )
}
