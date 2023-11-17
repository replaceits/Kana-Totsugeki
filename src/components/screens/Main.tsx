import React from 'react'

import { CurrentScreen } from '.'
import { LocalizationContext } from '../../contexts/localization'

import './Main.scss'

export function MainMenu({
  setCurrentScreen,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<CurrentScreen>>
}) {
  const localization = React.useContext(LocalizationContext)

  const onStartClick = React.useCallback(() => {
    setCurrentScreen({ name: 'PlayField' })
  }, [setCurrentScreen])

  const onOptionsClick = React.useCallback(() => {
    setCurrentScreen({ name: 'Options' })
  }, [setCurrentScreen])

  return (
    <div className="game-main-menu">
      <div className="game-main-menu-header japanese">
        <h1>仮名突撃</h1>
        <h5>かなとつげき</h5>
        <br />
        {/* Kana Assault */}
      </div>
      <div className="game-main-menu-buttons">
        <div className="game-button start" onClick={onStartClick}>
          {localization.start}
        </div>
        <div className="game-button options" onClick={onOptionsClick}>
          {localization.options}
        </div>
      </div>
    </div>
  )
}
