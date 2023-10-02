import './PlayField.scss'

export default function PlayField() {
  return (
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
  )
}
