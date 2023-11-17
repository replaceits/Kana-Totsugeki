import React from 'react'

import { CurrentScreen, PreviousScreenPropsGameOver } from '.'
import { Locale, LocalizationContext } from '../../contexts/localization'

import './GameOver.scss'

export function GameOver({
  setCurrentScreen,
  previousScreenProps,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<CurrentScreen>>
  previousScreenProps?: PreviousScreenPropsGameOver
}) {
  const [finalProps, setFinalProps] =
    React.useState<PreviousScreenPropsGameOver>({
      gameScore: 0,
      correct: 0,
      seconds: 0,
      ...previousScreenProps,
    })

  React.useEffect(() => {
    if (previousScreenProps) setFinalProps({ ...previousScreenProps })
  }, [previousScreenProps])

  const localization = React.useContext<Locale>(LocalizationContext)

  const onRestartClick = React.useCallback(() => {
    setCurrentScreen({ name: 'PlayField' })
  }, [setCurrentScreen])

  const onMenuClick = React.useCallback(() => {
    setCurrentScreen({ name: 'MainMenu' })
  }, [setCurrentScreen])

  return (
    <div className="game-over">
      <div className="game-over-header">
        <span className="score">{localization.score}</span>:{' '}
        <span className="final-score mono">{finalProps.gameScore}</span>
      </div>
      <div className="game-over-header">
        <span className="correct">{localization.correct}</span>:{' '}
        <span className="final-correct mono">{finalProps.correct}</span>
      </div>
      <div className="game-over-header">
        <span className="seconds">Seconds</span>:{' '}
        {/* FIXME: Add localization for this */}
        <span className="final-seconds mono">{finalProps.seconds}</span>
      </div>
      <div className="game-over-buttons">
        <div className="game-button" onClick={onRestartClick}>
          {localization.restart}
        </div>
        <div className="game-button" onClick={onMenuClick}>
          {localization.menu}
        </div>
      </div>
    </div>
  )
}
