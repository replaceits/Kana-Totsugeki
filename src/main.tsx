import React from 'react'
import ReactDOM from 'react-dom/client'

import { GameWrapper } from './components/GameWrapper.tsx'

import './globals.scss'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <GameWrapper />
  </React.StrictMode>
)
