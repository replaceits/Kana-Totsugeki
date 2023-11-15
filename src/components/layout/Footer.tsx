import React from 'react'

import { SettingsContextObject, SettingsContext } from '../../contexts/settings'
import { Locale, LocalizationContext } from '../../contexts/localization'

import './Footer.scss'

export default function Footer() {
  const settingsContext =
    React.useContext<SettingsContextObject>(SettingsContext)
  const localization = React.useContext<Locale>(LocalizationContext)

  const onLanguageSwitcherClick = React.useCallback(() => {
    settingsContext.settingsDispatch({
      type: 'toggle',
      name: 'language',
    })
  }, [settingsContext])

  return (
    <div className="game-footer">
      <div className="game-footer-item">
        <a href="https://github.com/alic3dev/Kana-Totsugeki">
          <i className="fa fa-code-fork" aria-hidden="true"></i>
        </a>
      </div>
      <div className="game-footer-item">
        <a
          className={`language-switcher ${
            settingsContext.settings.language === 'japanese'
              ? 'japanese'
              : 'english'
          }`}
          onClick={onLanguageSwitcherClick}
        >
          {localization.opposite_language}
        </a>
      </div>
    </div>
  )
}
