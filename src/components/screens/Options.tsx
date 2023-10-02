import './Options.scss'

export default function Options() {
  return (
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
  )
}
