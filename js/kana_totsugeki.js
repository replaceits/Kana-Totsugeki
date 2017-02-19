/// <reference path="../typings/index.d.ts" />

var questions={a:{a:{katakana:"ア",hiragana:"あ"},i:{katakana:"イ",hiragana:"い"},u:{katakana:"ウ",hiragana:"う"},e:{katakana:"エ",hiragana:"え"},o:{katakana:"オ",hiragana:"お"}},k:{a:{katakana:"カ",hiragana:"か"},i:{katakana:"キ",hiragana:"き"},u:{katakana:"ク",hiragana:"く"},e:{katakana:"ケ",hiragana:"け"},o:{katakana:"コ",hiragana:"こ"}},s:{a:{katakana:"サ",hiragana:"さ"},i:{katakana:"シ",hiragana:"し"},u:{katakana:"ス",hiragana:"す"},e:{katakana:"セ",hiragana:"せ"},o:{katakana:"ソ",hiragana:"そ"}},t:{a:{katakana:"タ",hiragana:"た"},i:{katakana:"チ",hiragana:"ち"},u:{katakana:"ツ",hiragana:"つ"},e:{katakana:"テ",hiragana:"て"},o:{katakana:"ト",hiragana:"と"}},n:{a:{katakana:"ナ",hiragana:"な"},i:{katakana:"ニ",hiragana:"に"},u:{katakana:"ヌ",hiragana:"ぬ"},e:{katakana:"ネ",hiragana:"ね"},o:{katakana:"ノ",hiragana:"の"}},h:{a:{katakana:"ハ",hiragana:"は"},i:{katakana:"ヒ",hiragana:"ひ"},u:{katakana:"フ",hiragana:"ふ"},e:{katakana:"ヘ",hiragana:"へ"},o:{katakana:"ホ",hiragana:"ほ"}},m:{a:{katakana:"マ",hiragana:"ま"},i:{katakana:"ミ",hiragana:"み"},u:{katakana:"ム",hiragana:"む"},e:{katakana:"メ",hiragana:"め"},o:{katakana:"モ",hiragana:"も"}},y:{a:{katakana:"ヤ",hiragana:"や"},u:{katakana:"ユ",hiragana:"ゆ"},o:{katakana:"ヨ",hiragana:"よ"}},r:{a:{katakana:"ラ",hiragana:"ら"},i:{katakana:"リ",hiragana:"り"},u:{katakana:"ル",hiragana:"る"},e:{katakana:"レ",hiragana:"れ"},o:{katakana:"ロ",hiragana:"ろ"}},w:{a:{katakana:"ワ",hiragana:"わ"},o:{katakana:"ヲ",hiragana:"を"}},n:{n:{katakana:"ン",hiragana:"ん"}}};

var gameSettings = {
    'hiraganaQuestions' : true,
    'katakanaQuestions' : true,
    'romajiQuestions' : true,
    'hiraganaAnswers' : true,
    'katakanaAnswers' : true,
    'romajiAnswers' : true,
    'lives' : 3
};

var currentGame = {
    'display' : '',
    'answers'  : {
        'romaji' : '',
        'hiragana' : '',
        'katakana' : ''
    },
    'score' : 0,
    'lives' : 3
};

function newRound(){
    questionKeys = Object.keys(questions);
    questionBaseChar = questionKeys[Math.floor(Math.random() * questionKeys.length)];
    questionBase = questions[questionBaseChar];
    questionBaseKeys = Object.keys(questionBase);
    questionSecondChar = questionBaseKeys[Math.floor(Math.random() * questionBaseKeys.length)];
    question = questionBase[questionSecondChar];
    currentGame['display'] = question[Math.floor(Math.random() * 2)=='1'?'katakana':'hiragana'];
    currentGame['answers']['hiragana'] = question['hiragana'];
    currentGame['answers']['katakana'] = question['katakana'];
    currentGame['answers']['romaji'] =  questionBaseChar   == 'a' ? questionSecondChar
                                       :questionSecondChar == 'n' ? questionBaseChar
                                       :questionBaseChar + questionSecondChar;
    switch(currentGame['answers']['romaji']){
        case 'si':
            currentGame['answers']['romaji'] = 'shi';
            break;
        case 'ti':
            currentGame['answers']['romaji'] = 'chi';
            break;
        case 'tu':
            currentGame['answers']['romaji'] = 'tsu';
            break;
        case 'hu':
            currentGame['answers']['romaji'] = 'fu';
            break;
        default:
            break;
    }
    $('.game-question').text(currentGame['display']);
    $('.game-input-answer').val("");
}

function checkAnswer(){
    let userAnswer = $('.game-input-answer').val();
    return (  gameSettings['romajiAnswers'  ] && userAnswer === currentGame['answers']['romaji'  ] 
           || gameSettings['hiraganaAnswers'] && userAnswer === currentGame['answers']['hiragana']
           || gameSettings['katakanaAnswers'] && userAnswer === currentGame['answers']['katakana'])
}

function updateScore( wonRound ){
    if(wonRound){
        currentGame['score'] += 100;
    } else {
        currentGame['score'] -= currentGame['score']-100<0?0:100;
    }
    $('.game-score').text(currentGame['score']);
}

function lostGame(){

}

$(document).ready(function(){
    $('.game-wrapper').fadeIn(1000);
    newRound();

    $('.game-input-answer').on('keypress', function (e) {
        //If Enter was pressed
        if(e.which === 13){
            if(checkAnswer()){
                updateScore(true);
            } else {
                updateScore(false);
                currentGame['lives']--;
                if(currentGame['lives'] === 0){
                    lostGame();
                }
            }
            newRound();
        }
    });

    $('.language-switcher').click(function(){
        if($(this).hasClass('japanese')){
            $(this).text("English");
            $(this).removeClass('japanese');
            $(this).addClass('english');
        } else {
            $(this).text("日本語");
            $(this).removeClass('english');
            $(this).addClass('japanese');
        }
    });
});
