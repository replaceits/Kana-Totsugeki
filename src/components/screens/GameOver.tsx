import React from 'react'

import { ScreenName } from '.'
import { Locale, LocalizationContext } from '../../contexts/localization'

import './GameOver.scss'

export default function GameOver({
  setCurrentScreen,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<ScreenName>>
}) {
  const localization = React.useContext<Locale>(LocalizationContext)

  const onRestartClick = React.useCallback(() => {
    setCurrentScreen('PlayField')
  }, [setCurrentScreen])

  const onMenuClick = React.useCallback(() => {
    setCurrentScreen('MainMenu')
  }, [setCurrentScreen])

  return (
    <div className="game-over">
      <div className="game-over-header">
        <span className="score">{localization.score}</span>:{' '}
        <span className="final-score mono">0</span>
      </div>
      <div className="game-over-header">
        <span className="correct">{localization.correct}</span>:{' '}
        <span className="final-correct mono">0</span>
      </div>
      <div className="game-over-header">
        <span className="seconds">Seconds</span>:{' '}
        {/* FIXME: Add localization for this */}
        <span className="final-seconds mono">0</span>
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
