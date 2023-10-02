import React from 'react'
import ReactDOM from 'react-dom/client'

import { GameOver, MainMenu, Options, PlayField } from './components/screens'
import Footer from './components/layout/Footer.tsx'

import './scss/kana_totsugeki.scss'

import './kana_totsugeki.ts'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <main className="game-wrapper">
      <MainMenu />
      <Options />
      <PlayField />
      <GameOver />

      <Footer />
    </main>
  </React.StrictMode>
)
