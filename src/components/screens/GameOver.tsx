import './GameOver.scss'

export default function GameOver() {
  return (
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
  )
}
