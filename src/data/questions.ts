export interface Answers {
  katakana: string
  hiragana: string
}

export interface Questions {
  [romaji: string]: Readonly<Answers>
}

export const questions: Readonly<Questions> = Object.freeze({
  a: Object.freeze({ hiragana: 'あ', katakana: 'ア' }),
  i: Object.freeze({ hiragana: 'い', katakana: 'イ' }),
  u: Object.freeze({ hiragana: 'う', katakana: 'ウ' }),
  e: Object.freeze({ hiragana: 'え', katakana: 'エ' }),
  o: Object.freeze({ hiragana: 'お', katakana: 'オ' }),
  ka: Object.freeze({ hiragana: 'か', katakana: 'カ' }),
  ki: Object.freeze({ hiragana: 'き', katakana: 'キ' }),
  ku: Object.freeze({ hiragana: 'く', katakana: 'ク' }),
  ke: Object.freeze({ hiragana: 'け', katakana: 'ケ' }),
  ko: Object.freeze({ hiragana: 'こ', katakana: 'コ' }),
  sa: Object.freeze({ hiragana: 'さ', katakana: 'サ' }),
  shi: Object.freeze({ hiragana: 'し', katakana: 'シ' }),
  su: Object.freeze({ hiragana: 'す', katakana: 'ス' }),
  se: Object.freeze({ hiragana: 'せ', katakana: 'セ' }),
  so: Object.freeze({ hiragana: 'そ', katakana: 'ソ' }),
  ta: Object.freeze({ hiragana: 'た', katakana: 'タ' }),
  chi: Object.freeze({ hiragana: 'ち', katakana: 'チ' }),
  tsu: Object.freeze({ hiragana: 'つ', katakana: 'ツ' }),
  te: Object.freeze({ hiragana: 'て', katakana: 'テ' }),
  to: Object.freeze({ hiragana: 'と', katakana: 'ト' }),
  na: Object.freeze({ hiragana: 'な', katakana: 'ナ' }),
  ni: Object.freeze({ hiragana: 'に', katakana: 'ニ' }),
  nu: Object.freeze({ hiragana: 'ぬ', katakana: 'ヌ' }),
  ne: Object.freeze({ hiragana: 'ね', katakana: 'ネ' }),
  no: Object.freeze({ hiragana: 'の', katakana: 'ノ' }),
  ha: Object.freeze({ hiragana: 'は', katakana: 'ハ' }),
  hi: Object.freeze({ hiragana: 'ひ', katakana: 'ヒ' }),
  fu: Object.freeze({ hiragana: 'ふ', katakana: 'フ' }),
  he: Object.freeze({ hiragana: 'へ', katakana: 'ヘ' }),
  ho: Object.freeze({ hiragana: 'ほ', katakana: 'ホ' }),
  ma: Object.freeze({ hiragana: 'ま', katakana: 'マ' }),
  mi: Object.freeze({ hiragana: 'み', katakana: 'ミ' }),
  mu: Object.freeze({ hiragana: 'む', katakana: 'ム' }),
  me: Object.freeze({ hiragana: 'め', katakana: 'メ' }),
  mo: Object.freeze({ hiragana: 'も', katakana: 'モ' }),
  ya: Object.freeze({ hiragana: 'や', katakana: 'ヤ' }),
  yu: Object.freeze({ hiragana: 'ゆ', katakana: 'ユ' }),
  yo: Object.freeze({ hiragana: 'よ', katakana: 'ヨ' }),
  ra: Object.freeze({ hiragana: 'ら', katakana: 'ラ' }),
  ri: Object.freeze({ hiragana: 'り', katakana: 'リ' }),
  ru: Object.freeze({ hiragana: 'る', katakana: 'ル' }),
  re: Object.freeze({ hiragana: 'れ', katakana: 'レ' }),
  ro: Object.freeze({ hiragana: 'ろ', katakana: 'ロ' }),
  wa: Object.freeze({ hiragana: 'わ', katakana: 'ワ' }),
  wo: Object.freeze({ hiragana: 'を', katakana: 'ヲ' }),
  n: Object.freeze({ hiragana: 'ん', katakana: 'ン' }),
})

type QuestionTypes = 'romaji' | 'hiragana' | 'katakana'

export interface FormatedQuestion {
  selected: QuestionTypes
  hiragana: string
  katakana: string
  romaji: string
}

type FormatedQuestions = {
  [key in QuestionTypes]: Readonly<FormatedQuestion[]>
}

export const formatedQuestions: Readonly<FormatedQuestions> = Object.freeze({
  romaji: Object.freeze(
    Object.keys(questions).map<FormatedQuestion>(
      (q: string): FormatedQuestion =>
        Object.freeze({
          selected: 'romaji' as QuestionTypes,
          romaji: q,
          ...questions[q],
        })
    )
  ),

  hiragana: Object.freeze(
    Object.keys(questions).map<FormatedQuestion>(
      (q: string): FormatedQuestion =>
        Object.freeze({
          selected: 'hiragana' as QuestionTypes,
          romaji: q,
          ...questions[q],
        })
    )
  ),

  katakana: Object.freeze(
    Object.keys(questions).map<FormatedQuestion>(
      (q: string): FormatedQuestion =>
        Object.freeze({
          selected: 'katakana' as QuestionTypes,
          romaji: q,
          ...questions[q],
        })
    )
  ),
})
