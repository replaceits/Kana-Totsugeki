import React from 'react'

import ScoreCounter from '../ScoreCounter'

import { CurrentScreen } from '.'

import { SettingsContext, SettingsContextObject } from '../../contexts/settings'
import { formatedQuestions, FormatedQuestion } from '../../data/questions'

import './PlayField.scss'

export default function PlayField({
  setCurrentScreen,
  active,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<CurrentScreen>>
  active: boolean
}) {
  const [startTime] = React.useState<number>(Date.now())
  const [correct, setCorrect] = React.useState<number>(0)
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
  const countdownTimerRef = React.useRef<{ handler: number | null }>({
    handler: null,
  })

  const stopTimer = React.useCallback(() => {
    if (countdownTimerRef.current.handler) {
      cancelAnimationFrame(countdownTimerRef.current.handler)
    }
  }, [])

  const restartTimer = React.useCallback(() => {
    stopTimer()

    let firstTime: number

    const countdownAnimationLength: number = {
      slow: 7500,
      medium: 5000,
      fast: 2500,
    }[settings.settings.speed]

    const countdownAnimationFrameRequest = (time: number): void => {
      if (countdownRef.current === null) {
        countdownTimerRef.current.handler = requestAnimationFrame(
          countdownAnimationFrameRequest
        )

        return
      }

      if (!firstTime) firstTime = time
      const elapsedTime: number = time - firstTime

      const completedPercentage =
        Math.max(
          (countdownAnimationLength - elapsedTime) / countdownAnimationLength,
          0
        ) * 100

      countdownRef.current.style.width = `${completedPercentage}%`

      if (completedPercentage) {
        countdownTimerRef.current.handler = requestAnimationFrame(
          countdownAnimationFrameRequest
        )
      } else {
        setHealth((prevHealth) => {
          const resetPlayField = () => {
            if (prevHealth - 1 > 0) {
              if (inputRef.current) {
                inputRef.current.disabled = false
                inputRef.current.value = ''
                inputRef.current.focus()
              }

              setCurrentQuestion(generateNewQuestion())

              restartTimer()
            } else {
              stopTimer()
            }
          }

          if (settings.settings.showCorrect) {
            stopTimer()

            if (inputRef.current) {
              inputRef.current.disabled = true
              inputRef.current.value = `${currentQuestion.romaji} ${currentQuestion.hiragana} ${currentQuestion.katakana}`
            }

            setTimeout(resetPlayField, 1000)
          }

          return prevHealth - 1
        })
        setGameScore((prevScore) => Math.max(prevScore - 100, 0))
      }
    }

    countdownTimerRef.current.handler = requestAnimationFrame(
      countdownAnimationFrameRequest
    )
  }, [
    currentQuestion,
    generateNewQuestion,
    settings.settings.showCorrect,
    settings.settings.speed,
    stopTimer,
  ])

  React.useEffect(() => {
    if (!active) {
      if (inputRef.current) {
        inputRef.current.disabled = true
        inputRef.current.value = ''
      }
    } else {
      if (inputRef.current) {
        inputRef.current.disabled = false
        inputRef.current.value = ''
        inputRef.current.focus()
      }

      restartTimer()
    }
  }, [active, restartTimer, settings.settings.lives])

  React.useEffect(() => {
    if (health === 0) {
      stopTimer()

      const goToGameOver = () => {
        setCurrentScreen({
          name: 'GameOver',
          props: {
            gameScore,
            seconds: Math.floor((Date.now() - startTime) / 1000),
            correct,
          },
        })
      }

      if (settings.settings.showCorrect) {
        setTimeout(goToGameOver, 1000)
      } else {
        goToGameOver()
      }
    }
  }, [
    correct,
    startTime,
    health,
    gameScore,
    setCurrentScreen,
    stopTimer,
    settings.settings.showCorrect,
    settings.settings.lives,
  ])

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
        setCorrect((prevCorrect: number): number => prevCorrect + 1)
        setGameScore((prevScore: number): number => prevScore + 100)
        if (inputRef.current) inputRef.current.value = ''
        restartTimer()
      } else {
        setHealth((prevHealth) => {
          const resetPlayField = () => {
            if (prevHealth - 1 > 0) {
              if (inputRef.current) {
                inputRef.current.disabled = false
                inputRef.current.value = ''
                inputRef.current.focus()
              }

              setCurrentQuestion(generateNewQuestion())

              restartTimer()
            } else {
              stopTimer()
            }
          }

          if (settings.settings.showCorrect) {
            stopTimer()

            if (inputRef.current) {
              inputRef.current.disabled = true
              inputRef.current.value = `${currentQuestion.romaji} ${currentQuestion.hiragana} ${currentQuestion.katakana}`
            }

            setTimeout(resetPlayField, 1000)
          } else {
            resetPlayField()
          }

          return prevHealth - 1
        })
        setGameScore((prevScore: number): number =>
          Math.max(prevScore - 100, 0)
        )
      }
    },
    [
      settings.settings.romajiAnswers,
      settings.settings.hiraganaAnswers,
      settings.settings.katakanaAnswers,
      settings.settings.showCorrect,
      currentQuestion,
      generateNewQuestion,
      restartTimer,
      stopTimer,
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
