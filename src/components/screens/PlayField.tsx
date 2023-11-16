import React, { FormEvent } from 'react'

import { ScreenName } from '.'

import { SettingsContext, SettingsContextObject } from '../../contexts/settings'
import { questions } from '../../data/questions'

import './PlayField.scss'
import ScoreCounter from '../ScoreCounter'

export default function PlayField({
  setCurrentScreen,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<ScreenName>>
}) {
  const settings = React.useContext<SettingsContextObject>(SettingsContext)
  const [gameScore, setGameScore] = React.useState<number>(0)


    if (settings.settings.romajiQuestions) res.push(...Object.keys(questions))
    if (settings.settings.hiraganaQuestions)
      res.push(...Object.values(questions).map((q) => q.hiragana))
    if (settings.settings.katakanaQuestions)
      res.push(...Object.values(questions).map((q) => q.katakana))

    return res
  }, [
    settings.settings.romajiQuestions,
    settings.settings.hiraganaQuestions,
    settings.settings.katakanaQuestions,
  ])

  const [currentQuestion, setCurrentQuestion] = React.useState<string>(
    (): string =>
      validQuestions[Math.floor(Math.random() * validQuestions.length)]
  )
  const [health, setHealth] = React.useState(settings.settings.lives)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const countdownRef = React.useRef<HTMLDivElement>(null)

  const resetGame = React.useCallback(() => {
    inputRef.current?.focus()

    setCurrentQuestion('')
    setHealth(settings.settings.lives)
  }, [settings, inputRef])

  React.useEffect(() => {
    inputRef.current?.focus()

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
  }, [])

  React.useEffect(() => {
    if (health === 0) {
      setCurrentScreen('GameOver')
    }
  }, [health, setCurrentScreen])

  const onAnswerSubmit = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter' && event.code !== 'Enter') return

      // TODO: Check answer

      alert(event.currentTarget.value)
    },
    []
  )

  return (
    <div className="game-play-field-wrapper">
      <div className="game-countdown-timer" ref={countdownRef}></div>
      <div className="game-play-field">
        <div className="game-question japanese">{currentQuestion}</div>
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
