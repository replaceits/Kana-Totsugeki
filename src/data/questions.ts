export interface Answers {
  katakana: string
  hiragana: string
}

export interface Questions {
  [romaji: string]: Answers
}

export const questions: Questions = {
  a: { hiragana: 'あ', katakana: 'ア' },
  i: { hiragana: 'い', katakana: 'イ' },
  u: { hiragana: 'う', katakana: 'ウ' },
  e: { hiragana: 'え', katakana: 'エ' },
  o: { hiragana: 'お', katakana: 'オ' },
  ka: { hiragana: 'か', katakana: 'カ' },
  ki: { hiragana: 'き', katakana: 'キ' },
  ku: { hiragana: 'く', katakana: 'ク' },
  ke: { hiragana: 'け', katakana: 'ケ' },
  ko: { hiragana: 'こ', katakana: 'コ' },
  sa: { hiragana: 'さ', katakana: 'サ' },
  shi: { hiragana: 'し', katakana: 'シ' },
  su: { hiragana: 'す', katakana: 'ス' },
  se: { hiragana: 'せ', katakana: 'セ' },
  so: { hiragana: 'そ', katakana: 'ソ' },
  ta: { hiragana: 'た', katakana: 'タ' },
  chi: { hiragana: 'ち', katakana: 'チ' },
  tsu: { hiragana: 'つ', katakana: 'ツ' },
  te: { hiragana: 'て', katakana: 'テ' },
  to: { hiragana: 'と', katakana: 'ト' },
  na: { hiragana: 'な', katakana: 'ナ' },
  ni: { hiragana: 'に', katakana: 'ニ' },
  nu: { hiragana: 'ぬ', katakana: 'ヌ' },
  ne: { hiragana: 'ね', katakana: 'ネ' },
  no: { hiragana: 'の', katakana: 'ノ' },
  ha: { hiragana: 'は', katakana: 'ハ' },
  hi: { hiragana: 'ひ', katakana: 'ヒ' },
  fu: { hiragana: 'ふ', katakana: 'フ' },
  he: { hiragana: 'へ', katakana: 'ヘ' },
  ho: { hiragana: 'ほ', katakana: 'ホ' },
  ma: { hiragana: 'ま', katakana: 'マ' },
  mi: { hiragana: 'み', katakana: 'ミ' },
  mu: { hiragana: 'む', katakana: 'ム' },
  me: { hiragana: 'め', katakana: 'メ' },
  mo: { hiragana: 'も', katakana: 'モ' },
  ya: { hiragana: 'や', katakana: 'ヤ' },
  yu: { hiragana: 'ゆ', katakana: 'ユ' },
  yo: { hiragana: 'よ', katakana: 'ヨ' },
  ra: { hiragana: 'ら', katakana: 'ラ' },
  ri: { hiragana: 'り', katakana: 'リ' },
  ru: { hiragana: 'る', katakana: 'ル' },
  re: { hiragana: 'れ', katakana: 'レ' },
  ro: { hiragana: 'ろ', katakana: 'ロ' },
  wa: { hiragana: 'わ', katakana: 'ワ' },
  wo: { hiragana: 'を', katakana: 'ヲ' },
  n: { hiragana: 'ん', katakana: 'ン' },
}

type QuestionTypes = 'romaji' | 'hiragana' | 'katakana'

export interface FormatedQuestion {
  selected: QuestionTypes
  hiragana: string
  katakana: string
  romaji: string
}

type FormatedQuestions = {
  [key in QuestionTypes]: FormatedQuestion[]
}

export const formatedQuestions: FormatedQuestions = {
  romaji: Object.keys(questions).map<FormatedQuestion>(
    (q: string): FormatedQuestion => ({
      selected: 'romaji' as QuestionTypes,
      romaji: q,
      ...questions[q],
    })
  ),

  hiragana: Object.keys(questions).map<FormatedQuestion>(
    (q: string): FormatedQuestion => ({
      selected: 'hiragana' as QuestionTypes,
      romaji: q,
      ...questions[q],
    })
  ),

  katakana: Object.keys(questions).map<FormatedQuestion>(
    (q: string): FormatedQuestion => ({
      selected: 'katakana' as QuestionTypes,
      romaji: q,
      ...questions[q],
    })
  ),
}

// export const bquestions: Questions = {
//   kya: {},
//   kyo: {},
//   kyu: {},
//   cha: {},
//   cho: {},
//   chu: {},
//   jya: {},
//   jyo: {},
//   jyu: {},
// }

export default questions
