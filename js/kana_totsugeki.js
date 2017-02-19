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

    let questionTypes = new Array();

    if(gameSettings['romajiQuestions']){
        questionTypes.push(currentGame['answers']['romaji']);
    }
    if(gameSettings['hiraganaQuestions']){
        questionTypes.push(currentGame['answers']['hiragana']);
    }
    if(gameSettings['katakanaQuestions']){
        questionTypes.push(currentGame['answers']['katakana']);
    }

    currentGame['display'] = questionTypes[Math.floor(Math.random() * questionTypes.length)];
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
    $('.game-score').animate({fakevalue: currentGame['score']},{step: function(now,fx){
        $(this).text(Math.floor(now));
    }},1000);
}

function lostGame(){

}

$(document).ready(function(){
    var name = "gameSettings=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            gameSettings = $.parseJSON(c.substring(name.length, c.length));
            if(!gameSettings['romajiAnswers']){
                $('.answers-romaji').removeClass('enabled').addClass('disabled');
            }
            if(!gameSettings['hiraganaAnswers']){
                $('.answers-hiragana').removeClass('enabled').addClass('disabled');
            }
            if(!gameSettings['katakanaAnswers']){
                $('.answers-katakana').removeClass('enabled').addClass('disabled');
            }
            if(gameSettings['romajiQuestions']){
                $('.questions-romaji').removeClass('disabled').addClass('enabled');
            }
            if(!gameSettings['hiraganaQuestions']){
                $('.questions-hiragana').removeClass('enabled').addClass('disabled');
            }
            if(!gameSettings['katakanaQuestions']){
                $('.questions-katakana').removeClass('enabled').addClass('disabled');
            }
        }
    }


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

    $('.start').click(function(){
        $('.game-main-menu').fadeOut(500);
        $('.game-play-field').delay(500).css('display','flex').hide().fadeIn(250);
        setTimeout(function(){
            $('.game-input-answer').focus();
        }, 500);
        newRound();
    });

    $('.options').click(function(){
        $('.game-main-menu').fadeOut(500);
        $('.game-options-menu').delay(500).css('display','flex').hide().fadeIn(250);
    });

    $('.exit').click(function(){
        $('.game-options-menu').fadeOut(500);
        $('.game-main-menu').delay(500).fadeIn(250);
    });

    $('.game-options-tiny-button').click(function(){
        if($(this).hasClass('enabled')){
            $(this).removeClass('enabled').addClass('disabled');
        } else {
            $(this).removeClass('disabled').addClass('enabled');
        }
        if($(this).hasClass('answers-romaji')){
            gameSettings['romajiAnswers'] = $(this).hasClass('enabled');
        } else if($(this).hasClass('answers-hiragana')){
            gameSettings['hiraganaAnswers'] = $(this).hasClass('enabled');
        } else if($(this).hasClass('answers-katakana')){
            gameSettings['katakanaAnswers'] = $(this).hasClass('enabled');
        } else if($(this).hasClass('questions-romaji')){
            gameSettings['romajiQuestions'] = $(this).hasClass('enabled');
        } else if($(this).hasClass('questions-hiragana')){
            gameSettings['hiraganaQuestions'] = $(this).hasClass('enabled');
        } else if($(this).hasClass('questions-katakana')){
            gameSettings['katakanaQuestions'] = $(this).hasClass('enabled');
        }

        let expires = new Date();
        expires.setTime(expires.getTime() + 2592000000);
        document.cookie = "gameSettings=" + JSON.stringify(gameSettings) + ";expires=" + expires.toUTCString() + ";path=/";
    });

    $(document).on('keyup',function(e){
        switch(e.which){
            //If ESC was pressed
            case 27:
                if(!$('.game-main-menu').is(":visible")){
                    $('.game-options-menu').fadeOut(500);
                    $('.game-play-field').fadeOut(500);
                    $('.game-main-menu').delay(500).fadeIn(250);
                }
                break;
        }
    });

    var keyDown = {};

    $('.game-input-answer').on('keypress', function (e) {
        //If Enter was pressed
        if(e.which === 13){
            if (keyDown[e.which] === null && $('.game-input-answer').val() !== "") {
                keyDown[e.which] = true;
            
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
        }
    }).on('keyup', function(e) {
        keyDown[e.which] = null;
    });
});
