import { GameOver } from './GameOver.tsx'
import { MainMenu } from './Main.tsx'
import { Options } from './Options.tsx'
import { PlayField } from './PlayField.tsx'

export type ScreenName = 'GameOver' | 'MainMenu' | 'Options' | 'PlayField'

export interface PreviousScreenPropsGameOver {
  gameScore: number
  correct: number
  seconds: number
}

export interface CurrentScreen {
  name: ScreenName
  props?: PreviousScreenPropsGameOver
}

export { GameOver, MainMenu, Options, PlayField }
