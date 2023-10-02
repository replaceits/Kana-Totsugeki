import './Main.scss'

export default function MainMenu() {
  return (
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
  )
}
