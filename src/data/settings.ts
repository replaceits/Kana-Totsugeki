export type LanguageSetting = 'english' | 'japanese'
export type SpeedSetting = 'slow' | 'medium' | 'fast'

export type Setting = boolean | number | LanguageSetting | SpeedSetting

export interface Settings {
  hiraganaQuestions: boolean
  katakanaQuestions: boolean
  romajiQuestions: boolean
  hiraganaAnswers: boolean
  katakanaAnswers: boolean
  romajiAnswers: boolean
  noRepeats: boolean
  showCorrect: boolean
  lives: number
  language: LanguageSetting
  speed: SpeedSetting
}

export const defaultSettings: Settings = {
  hiraganaQuestions: true,
  katakanaQuestions: true,
  romajiQuestions: false,
  hiraganaAnswers: true,
  katakanaAnswers: true,
  romajiAnswers: true,
  noRepeats: true,
  showCorrect: true,
  lives: 3,
  language: 'english',
  speed: 'medium',
}
