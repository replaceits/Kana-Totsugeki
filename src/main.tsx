import React from 'react'
import ReactDOM from 'react-dom/client'

import './scss/kana_totsugeki.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="game-wrapper">
      <div className="game-main-menu">
        <div className="game-main-menu-header japanese">
          仮名突撃
          <br />
          Kana Assault
        </div>
        <div className="game-main-menu-buttons">
          <div className="game-button start">Start</div>
          <div className="game-button options">Options</div>
        </div>
      </div>

      <div className="game-options-menu">
        <div className="game-options-menu-column-container">
          <div className="game-options-menu-column">
            <div className="game-options-menu-column-item">
              <div className="game-options-menu-column-item-header questions">
                Questions
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="romaji">Romaji</span>
                <div className="game-options-tiny-button questions-romaji disabled"></div>
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="hiragana">Hiragana</span>
                <div className="game-options-tiny-button questions-hiragana enabled"></div>
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="katakana">Katakana</span>
                <div className="game-options-tiny-button questions-katakana enabled"></div>
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="show-correct">Show correct</span>
                <div className="game-options-tiny-button questions-show-correct enabled"></div>
              </div>
            </div>
            <div className="game-options-menu-column-item">
              <div className="game-options-menu-column-item-header speed">
                Speed
              </div>
              <div className="game-options-menu-column-item-button-choice">
                <div className="game-options-medium-button button-speed disabled slow">
                  Slow
                </div>
                <div className="game-options-medium-button button-speed enabled medium">
                  Medium
                </div>
                <div className="game-options-medium-button button-speed disabled fast">
                  Fast
                </div>
              </div>
            </div>
          </div>
          <div className="game-options-menu-column">
            <div className="game-options-menu-column-item">
              <div className="game-options-menu-column-item-header answers">
                Answers
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="romaji">Romaji</span>
                <div className="game-options-tiny-button answers-romaji enabled"></div>
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="hiragana">Hiragana</span>
                <div className="game-options-tiny-button answers-hiragana enabled"></div>
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="katakana">Katakana</span>
                <div className="game-options-tiny-button answers-katakana enabled"></div>
              </div>
              <div className="game-options-menu-column-item-choice">
                <span className="no-repeat">No repeats</span>
                <div className="game-options-tiny-button answers-no-repeat enabled"></div>
              </div>
            </div>
            <div className="game-options-menu-column-item">
              <div className="game-options-menu-column-item-header lives">
                Lives
              </div>
              <div className="game-options-menu-column-item-button-choice">
                <div className="game-options-medium-button disabled  button-lives">
                  1
                </div>
                <div className="game-options-medium-button button-lives enabled">
                  3
                </div>
                <div className="game-options-medium-button disabled button-lives">
                  5
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="game-button exit">Exit</div>
      </div>

      <div className="game-play-field-wrapper">
        <div className="game-countdown-timer"></div>
        <div className="game-play-field">
          <div className="game-question japanese"></div>
          <div className="game-input">
            <div className="carrot mono">&gt;</div>
            <input
              type="text"
              className="game-input-answer"
              maxLength={3}
              autoFocus
            />
          </div>
          <div className="game-input-underline"></div>
          <div className="game-score mono">0</div>
        </div>
        <div className="game-heart-container">
          <div className="game-heart">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div className="game-heart">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div className="game-heart">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div className="game-heart">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div className="game-heart">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div className="game-over">
        <div className="game-over-header">
          <span className="score">Score</span>:{' '}
          <span className="final-score mono">0</span>
        </div>
        <div className="game-over-header">
          <span className="correct">Correct</span>:{' '}
          <span className="final-correct mono">0</span>
        </div>
        <div className="game-over-header">
          <span className="seconds">Seconds</span>:{' '}
          <span className="final-seconds mono">0</span>
        </div>
        <div className="game-over-buttons">
          <div className="game-button restart">Restart</div>
          <div className="game-button menu">Menu</div>
        </div>
      </div>

      <div className="game-footer">
        <div className="game-footer-item">
          <a href="https://github.com/replaceits/Kana-Totsugeki">
            <i className="fa fa-code-fork" aria-hidden="true"></i>
          </a>
        </div>
        <div className="game-footer-item">
          <a className="language-switcher japanese">日本語</a>
        </div>
      </div>
    </div>
  </React.StrictMode>
)

import './kana_totsugeki.ts'
