import React from 'react'

import { defaultSettings, Setting, Settings } from '../data/settings'

interface SettingsDispatchAction {
  type: 'update' | 'toggle'
  name: keyof Settings
  value?: Setting
}

type SettingsDispatch = React.Dispatch<SettingsDispatchAction>

export interface SettingsContextObject {
  settings: Settings
  dispatch: SettingsDispatch
}

export const SettingsContext = React.createContext<SettingsContextObject>({
  settings: defaultSettings,
  dispatch: () => {},
})

const settingsReducer = (
  state: Settings,
  action: SettingsDispatchAction
): Settings => {
  if (action.type === 'update') {
    return { ...state, [action.name]: action.value }
  }

  if (action.type === 'toggle') {
    if (action.name === 'language') {
      return {
        ...state,
        language: state.language === 'japanese' ? 'english' : 'japanese',
      }
    }

    return { ...state, [action.name]: !state[action.name] }
  }

  return state
}

export const useSettingsReducer = (): [Settings, SettingsDispatch] => {
  const [settings, dispatch] = React.useReducer(
    settingsReducer,
    defaultSettings,
    (defaultSettings) => {
      try {
        return {
          ...defaultSettings,
          ...(JSON.parse(
            window.localStorage.getItem('kana-totsugeki:settings') || '{}'
          ) as Settings),
        }
      } catch {
        window.localStorage.removeItem('kana-totsugeki:settings')
      }

      return defaultSettings
    }
  )

  React.useEffect(() => {
    window.localStorage.setItem(
      'kana-totsugeki:settings',
      JSON.stringify(settings)
    )
  }, [settings])

  return [settings, dispatch]
}
