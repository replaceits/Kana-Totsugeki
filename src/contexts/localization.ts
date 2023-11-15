import React from 'react'

import { LanguageSetting } from '../data/settings'

export type Locales = {
  [locale in LanguageSetting]: Locale
}

export interface Locale {
  current_language: string
  opposite_language: string
  exit: string
  start: string
  options: string
  questions: string
  answers: string
  romaji: string
  hiragana: string
  katakana: string
  score: string
  correct: string
  restart: string
  menu: string
  lives: string
  speed: string
  slow: string
  medium: string
  fast: string
}

export const locales: Locales = {
  english: {
    current_language: 'English',
    opposite_language: '日本語',
    exit: 'Exit',
    start: 'Start',
    options: 'Options',
    questions: 'Questions',
    answers: 'Answers',
    romaji: 'Romaji',
    hiragana: 'Hiragana',
    katakana: 'Katakana',
    score: 'Score',
    correct: 'Correct',
    restart: 'Restart',
    menu: 'Menu',
    lives: 'Lives',
    speed: 'Speed',
    slow: 'Slow',
    medium: 'Medium',
    fast: 'Fast',
  },
  japanese: {
    current_language: '日本語',
    opposite_language: 'English',
    exit: '出口',
    start: '開始',
    options: 'オプション',
    questions: '質問',
    answers: '回答',
    romaji: 'ローマ字',
    hiragana: '平仮名',
    katakana: '片仮名',
    score: 'スコア',
    correct: '正しい',
    restart: '再起動',
    menu: 'メニュー',
    lives: '命',
    speed: '速度',
    slow: 'スロー',
    medium: '並',
    fast: '速い',
  },
}

export const LocalizationContext = React.createContext<Locale>(locales.english)
