import React from 'react'

import { Fader } from './Fader.tsx'
import {
  CurrentScreen,
  GameOver,
  MainMenu,
  Options,
  PlayField,
} from './screens'
import { Footer } from './layout/Footer.tsx'

import { SettingsContext, useSettingsReducer } from '../contexts/settings'
import { locales, LocalizationContext } from '../contexts/localization'

import './GameWrapper.scss'

export function GameWrapper() {
  const [settings, settingsDispatch] = useSettingsReducer()
  const [currentScreen, setCurrentScreen] = React.useState<CurrentScreen>({
    name: 'MainMenu',
  })

  const [playFieldActive, setPlayFieldActive] = React.useState<boolean>(false)
  const [gameCount, setGameCount] = React.useState<number>(0)

  React.useEffect(() => {
    if (!playFieldActive) {
      setGameCount((prevGameCount: number) => prevGameCount + 1)
    }
  }, [playFieldActive])

  return (
    <main className="game-wrapper">
      <SettingsContext.Provider
        value={{ settings, dispatch: settingsDispatch }}
      >
        <LocalizationContext.Provider value={locales[settings.language]}>
          <Fader active={currentScreen.name === 'MainMenu'}>
            <MainMenu setCurrentScreen={setCurrentScreen} />
          </Fader>
          <Fader active={currentScreen.name === 'Options'}>
            <Options setCurrentScreen={setCurrentScreen} />
          </Fader>
          <Fader
            active={currentScreen.name === 'PlayField'}
            onAnimationEnd={(active: boolean) => setPlayFieldActive(active)}
          >
            <PlayField
              key={`${gameCount}`}
              setCurrentScreen={setCurrentScreen}
              active={playFieldActive}
            />
          </Fader>
          <Fader active={currentScreen.name === 'GameOver'}>
            <GameOver
              setCurrentScreen={setCurrentScreen}
              previousScreenProps={currentScreen.props}
            />
          </Fader>

          <Footer />
        </LocalizationContext.Provider>
      </SettingsContext.Provider>
    </main>
  )
}
