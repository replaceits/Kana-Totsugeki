import './Footer.scss'

export default function Footer() {
  return (
    <div className="game-footer">
      <div className="game-footer-item">
        <a href="https://github.com/alic3dev/Kana-Totsugeki">
          <i className="fa fa-code-fork" aria-hidden="true"></i>
        </a>
      </div>
      <div className="game-footer-item">
        <a className="language-switcher japanese">日本語</a>
      </div>
    </div>
  )
}
