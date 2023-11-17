import React from 'react'

import { CurrentScreen } from '.'
import { Setting, Settings } from '@/src/data/settings'
import { SettingsContextObject, SettingsContext } from '../../contexts/settings'
import { Locale, LocalizationContext } from '../../contexts/localization'

import './Options.scss'

export function Options({
  setCurrentScreen,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<CurrentScreen>>
}) {
  const settings = React.useContext<SettingsContextObject>(SettingsContext)
  const localization = React.useContext<Locale>(LocalizationContext)

  const getOnOptionUpdate = React.useCallback(
    (name: keyof Settings, value: Setting): (() => void) =>
      (): void => {
        settings.dispatch({ type: 'update', name, value })
      },
    [settings]
  )

  const getOnOptionToggle = React.useCallback(
    (name: keyof Settings): (() => void) =>
      (): void => {
        settings.dispatch({ type: 'toggle', name })
      },
    [settings]
  )

  const getOptionState = React.useCallback(
    (name: keyof Settings, value: Setting = true): string => {
      return settings.settings[name] === value ? 'enabled' : 'disabled'
    },
    [settings]
  )

  const onExitClick = React.useCallback(
    () => setCurrentScreen({ name: 'MainMenu' }),
    [setCurrentScreen]
  )

  return (
    <div className="game-options-menu">
      <div className="game-options-menu-column-container">
        <div className="game-options-menu-column">
          <div className="game-options-menu-column-item">
            <div className="game-options-menu-column-item-header questions">
              {localization.questions}
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('romajiQuestions')}
            >
              <span className="romaji">{localization.romaji}</span>
              <div
                className={`game-options-tiny-button questions-romaji ${getOptionState(
                  'romajiQuestions'
                )}`}
              ></div>
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('hiraganaQuestions')}
            >
              <span className="hiragana">{localization.hiragana}</span>
              <div
                className={`game-options-tiny-button questions-hiragana ${getOptionState(
                  'hiraganaQuestions'
                )}`}
              ></div>
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('katakanaQuestions')}
            >
              <span className="katakana">{localization.katakana}</span>
              <div
                className={`game-options-tiny-button questions-katakana ${getOptionState(
                  'katakanaQuestions'
                )}`}
              ></div>
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('showCorrect')}
            >
              <span className="show-correct">Show correct</span>
              {/* FIXME: Add localization for this */}
              <div
                className={`game-options-tiny-button questions-show-correct ${getOptionState(
                  'showCorrect'
                )}`}
              ></div>
            </div>
          </div>
          <div className="game-options-menu-column-item">
            <div className="game-options-menu-column-item-header speed">
              {localization.speed}
            </div>
            <div className="game-options-menu-column-item-button-choice">
              <div
                className={`game-options-medium-button button-speed slow ${getOptionState(
                  'speed',
                  'slow'
                )}`}
                onClick={getOnOptionUpdate('speed', 'slow')}
              >
                {localization.slow}
              </div>
              <div
                className={`game-options-medium-button button-speed medium ${getOptionState(
                  'speed',
                  'medium'
                )}`}
                onClick={getOnOptionUpdate('speed', 'medium')}
              >
                {localization.medium}
              </div>
              <div
                className={`game-options-medium-button button-speed fast ${getOptionState(
                  'speed',
                  'fast'
                )}`}
                onClick={getOnOptionUpdate('speed', 'fast')}
              >
                {localization.fast}
              </div>
            </div>
          </div>
        </div>
        <div className="game-options-menu-column">
          <div className="game-options-menu-column-item">
            <div className="game-options-menu-column-item-header answers">
              {localization.answers}
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('romajiAnswers')}
            >
              <span className="romaji">{localization.romaji}</span>
              <div
                className={`game-options-tiny-button answers-romaji ${getOptionState(
                  'romajiAnswers'
                )}`}
              ></div>
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('hiraganaAnswers')}
            >
              <span className="hiragana">{localization.hiragana}</span>
              <div
                className={`game-options-tiny-button answers-hiragana ${getOptionState(
                  'hiraganaAnswers'
                )}`}
              ></div>
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('katakanaAnswers')}
            >
              <span className="katakana">{localization.katakana}</span>
              <div
                className={`game-options-tiny-button answers-katakana ${getOptionState(
                  'katakanaAnswers'
                )}`}
              ></div>
            </div>
            <div
              className="game-options-menu-column-item-choice"
              onClick={getOnOptionToggle('noRepeats')}
            >
              <span className="no-repeat">No repeats</span>
              <div
                className={`game-options-tiny-button answers-no-repeat ${getOptionState(
                  'noRepeats'
                )}`}
              ></div>
            </div>
          </div>
          <div className="game-options-menu-column-item">
            <div className="game-options-menu-column-item-header lives">
              {localization.lives}
            </div>
            <div className="game-options-menu-column-item-button-choice">
              <div
                className={`game-options-medium-button button-lives ${getOptionState(
                  'lives',
                  1
                )}`}
                onClick={getOnOptionUpdate('lives', 1)}
              >
                1
              </div>
              <div
                className={`game-options-medium-button button-lives  ${getOptionState(
                  'lives',
                  3
                )}`}
                onClick={getOnOptionUpdate('lives', 3)}
              >
                3
              </div>
              <div
                className={`game-options-medium-button button-lives ${getOptionState(
                  'lives',
                  5
                )}`}
                onClick={getOnOptionUpdate('lives', 5)}
              >
                5
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="game-button" onClick={onExitClick}>
        {localization.exit}
      </div>
    </div>
  )
}
