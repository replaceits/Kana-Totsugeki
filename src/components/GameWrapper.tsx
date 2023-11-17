import React from 'react'

import { Fader } from './Fader.tsx'

import { SettingsContext, useSettingsReducer } from '../contexts/settings'
import { locales, LocalizationContext } from '../contexts/localization'

import './GameWrapper.scss'

export function GameWrapper() {
  const [settings, settingsDispatch] = useSettingsReducer()

  const [playFieldActive, setPlayFieldActive] = React.useState<boolean>(false)

  return (
    <main className="game-wrapper">
      <SettingsContext.Provider
        value={{ settings, dispatch: settingsDispatch }}
      >
        <LocalizationContext.Provider value={locales[settings.language]}>
          <Fader active={currentScreen === 'MainMenu'}>
            <MainMenu setCurrentScreen={setCurrentScreen} />
          </Fader>
          <Fader active={currentScreen === 'Options'}>
            <Options setCurrentScreen={setCurrentScreen} />
          </Fader>
          <Fader
            active={currentScreen === 'PlayField'}
            onAnimationEnd={(active: boolean) => setPlayFieldActive(active)}
          >
            <PlayField
              setCurrentScreen={setCurrentScreen}
              active={playFieldActive}
            />
          </Fader>
          <Fader active={currentScreen === 'GameOver'}>
            <GameOver setCurrentScreen={setCurrentScreen} />
          </Fader>

          <Footer />
        </LocalizationContext.Provider>
      </SettingsContext.Provider>
    </main>
  )
}
