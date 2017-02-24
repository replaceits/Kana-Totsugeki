/// <reference path="../typings/index.d.ts" />

/*
 * Kana Totsugeki
 * 
 * MIT License
 *
 * Copyright (c) 2017 Sidney Williams
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

// Array containing all the questions/answers
// Minified, otherwise it would take up a good 200+ lines of just static data
// To make changes, beautify first, make changes, then minify again
var questions={a:{katakana:"ア",hiragana:"あ"},i:{katakana:"イ",hiragana:"い"},u:{katakana:"ウ",hiragana:"う"},e:{katakana:"エ",hiragana:"え"},o:{katakana:"オ",hiragana:"お"},ka:{katakana:"カ",hiragana:"か"},ki:{katakana:"キ",hiragana:"き"},ku:{katakana:"ク",hiragana:"く"},ke:{katakana:"ケ",hiragana:"け"},ko:{katakana:"コ",hiragana:"こ"},sa:{katakana:"サ",hiragana:"さ"},shi:{katakana:"シ",hiragana:"し"},su:{katakana:"ス",hiragana:"す"},se:{katakana:"セ",hiragana:"せ"},so:{katakana:"ソ",hiragana:"そ"},ta:{katakana:"タ",hiragana:"た"},chi:{katakana:"チ",hiragana:"ち"},tsu:{katakana:"ツ",hiragana:"つ"},te:{katakana:"テ",hiragana:"て"},to:{katakana:"ト",hiragana:"と"},na:{katakana:"ナ",hiragana:"な"},ni:{katakana:"ニ",hiragana:"に"},nu:{katakana:"ヌ",hiragana:"ぬ"},ne:{katakana:"ネ",hiragana:"ね"},no:{katakana:"ノ",hiragana:"の"},ha:{katakana:"ハ",hiragana:"は"},hi:{katakana:"ヒ",hiragana:"ひ"},fu:{katakana:"フ",hiragana:"ふ"},he:{katakana:"ヘ",hiragana:"へ"},ho:{katakana:"ホ",hiragana:"ほ"},ma:{katakana:"マ",hiragana:"ま"},mi:{katakana:"ミ",hiragana:"み"},mu:{katakana:"ム",hiragana:"む"},me:{katakana:"メ",hiragana:"め"},mo:{katakana:"モ",hiragana:"も"},ya:{katakana:"ヤ",hiragana:"や"},yu:{katakana:"ユ",hiragana:"ゆ"},yo:{katakana:"ヨ",hiragana:"よ"},ra:{katakana:"ラ",hiragana:"ら"},ri:{katakana:"リ",hiragana:"り"},ru:{katakana:"ル",hiragana:"る"},re:{katakana:"レ",hiragana:"れ"},ro:{katakana:"ロ",hiragana:"ろ"},wa:{katakana:"ワ",hiragana:"わ"},wo:{katakana:"ヲ",hiragana:"を"},n:{katakana:"ン",hiragana:"ん"}};

var gameSettings = {
    'questions'         : questions,
    'hiraganaQuestions' : true,
    'katakanaQuestions' : true,
    'romajiQuestions'   : false,
    'hiraganaAnswers'   : true,
    'katakanaAnswers'   : true,
    'romajiAnswers'     : true,
    'noRepeats'         : true,
    'showCorrect'       : true,
    'lives'             : 3,
    'language'          : 'english',
    'speed'             : 'medium'
};

var currentGame = {
    'questions' : $.extend(true,{},gameSettings['questions']),
    'display'   : '',
    'score'     : 0,
    'lives'     : 3,
    'correct'   : 0,
    'answers'   : {
        'romaji'   : '',
        'hiragana' : '',
        'katakana' : ''
    }
};

var GameTimer = {
    _elapsed: 0,
    _lastTime: (new Date()).getTime(),
    _paused: true,

    start: function(){
        this._lastTime = (new Date()).getTime();
        this._paused = false;
    },
    pause: function(){
        this._elapsed += (new Date()).getTime() - this._lastTime;
        this._paused = true;
    },
    restart: function(){
        this._elapsed = 0;
        this._lastTime = (new Date()).getTime();
        this._paused = false;
    },
    time: function(){
        if( this._paused ){
            return this._elapsed;
        } else {
            return this._elapsed + (new Date()).getTime() - this._lastTime;
        }
    }
};


function newRound( firstRun ){
    if( firstRun ){

        currentGame['questions'] = $.extend(true,{},gameSettings['questions']);
        currentGame[    'lives'] = gameSettings[    'lives'];
        currentGame[  'correct'] = 0;

        for(let i = 0; i < 5; i++){
            $('.game-heart:nth-of-type(' + (i + 1) + ')').removeClass('down').show().children('i').removeClass('fa-heart-o').removeClass('fa-heart').addClass('fa-heart');
            if( i > currentGame['lives'] - 1 ){
                $('.game-heart:nth-of-type(' + (i + 1) + ')').hide();
            }
        }

        currentGame['score'] = 0;

        // Reset the game score display. We have to reset the fakevalue to 0 or 
        // else the next animation will continue from where it was previously
        $('.game-score').stop(true,true).removeAttr('style').text('0').animate({
            fakevalue: 0
        },{
            duration: 0,

            complete: function(){
                $(this).removeClass('up');
                $(this).removeClass('down');
            }
        });
    }

    // Reset questions if user has answered them all
    if( gameSettings['noRepeats'] && Object.keys( currentGame['questions'] ).length === 0 ){
        currentGame['questions'] = $.extend(true,{},gameSettings['questions']);
    }

    $('.game-input-answer').prop('disabled',false);

    // Set focus to the input (otherwise user may not be ready to type)
    setTimeout(function(){
        $('.game-input-answer').focus();
    }, 250);

    // Generate question
    let questionKey = Object.keys( currentGame['questions'] )[ Math.floor( Math.random() * Object.keys( currentGame['questions'] ).length )];
    let question = currentGame['questions'][questionKey];
    currentGame['answers']['hiragana'] = question['hiragana'];
    currentGame['answers']['katakana'] = question['katakana'];
    currentGame['answers'][  'romaji'] = questionKey;

    // Generate answers
    let questionTypes = new Array();

    if( gameSettings['romajiQuestions'  ] ){
        questionTypes.push( currentGame['answers']['romaji'  ] );
    }
    if( gameSettings['hiraganaQuestions'] ){
        questionTypes.push( currentGame['answers']['hiragana'] );
    }
    if( gameSettings['katakanaQuestions'] ){
        questionTypes.push( currentGame['answers']['katakana'] );
    }

    // Generate the question to display on the screen
    currentGame['display'] = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    $('.game-question'    ).text(currentGame['display']);
    $('.game-input-answer').val("");

    // Reset the countdown timer
    $('.game-countdown-timer').stop(true,false).removeClass('down').removeAttr('style').delay( firstRun ? 250 : 0 ).animate({
        left: -$(this).width()
    },
    {
        duration: gameSettings['speed'] === 'fast' 
                    ? 2500 
                    : gameSettings['speed']==='medium'
                        ? 5000
                        : 7500, 
        easing: "linear",

        step: function(now, fx){
            if( Math.abs(now) >= Math.abs( fx.end ) / 6 ){
                $(this).addClass( 'down' );
            }
        },

        complete: function(){
            roundOver();
            $(this).removeClass('down');
        }
    });
}

function roundOver(){
    $('.game-countdown-timer').stop(true,false);
    $('.game-input-answer').prop('disabled',true);
    if( checkAnswer() ){
        if( gameSettings['noRepeats'] ){
            delete currentGame['questions'][currentGame['answers']['romaji']];
        }
        currentGame['correct']++;
        updateScore(true);
        newRound(false);
    } else {
        updateScore(false);

        $('.game-heart:nth-child(' + currentGame['lives'] + ')').addClass('down').children('i').removeClass('fa-heart').addClass('fa-heart-o');

        if( gameSettings['showCorrect'] ){
            $('.game-question').addClass('incorrect').text(
                currentGame['answers']['romaji'] + ' ' 
                + currentGame['answers']['hiragana'] + ' '
                + currentGame['answers']['katakana']);
            setTimeout(function(){
                $('.game-question').removeClass('incorrect');
                $('.game-input-answer').prop('disabled',false).focus();
                if( !lostLife() ){
                    newRound(false);
                }
            }, 2000);
        } else {
            if( !lostLife() ){
                newRound(false);
            }
        }
    }
}

function checkAnswer(){
    let userAnswer = $('.game-input-answer').val().toLowerCase();
    return (  gameSettings['romajiAnswers'  ] && userAnswer === currentGame['answers']['romaji'  ] 
           || gameSettings['hiraganaAnswers'] && userAnswer === currentGame['answers']['hiragana']
           || gameSettings['katakanaAnswers'] && userAnswer === currentGame['answers']['katakana'])
}

function updateScore( wonRound ){
    if( wonRound ){
        currentGame['score'] += 100;
    } else {
        currentGame['score'] -= currentGame['score'] - 100 < 0 ? 0 : 100;
    }

    $('.game-score').stop(true,true).removeAttr('style').addClass(wonRound?'up':'down').animate({
        // We use a fake value here as we don't actually want to animate any CSS but
        // jQuery forces us to update some form of CSS or it wont run the animation
        fakevalue: currentGame['score']
    },{
        duration: 1000,

        // Every step of the animation we set the score text equal to the current step
        // This gives the effect of the number spinning up or down
        step: function( now, fx ){
            $(this).text( Math.floor(now) );
        },

        complete: function(){
            $(this).removeClass('up'  );
            $(this).removeClass('down');
        }
    });
}

function lostGame(){
    $('.game-countdown-timer').stop(true,false).removeAttr('style');

    $('.final-score'  ).text( currentGame['score'  ] );
    $('.final-correct').text( currentGame['correct'] );
    
    $('.game-play-field-wrapper').fadeOut({
        duration: 500,

        complete: function(){
            $('.game-over' ).css( 'display', 'flex' ).hide().fadeIn(250);
        }  
    });

    $('.game-score').stop(true,true);

    currentGame['lives'  ] = gameSettings['lives'];
    currentGame['score'  ] = 0;
    currentGame['correct'] = 0;
}

function lostLife(){
    currentGame['lives']--;
    if( currentGame['lives'] === 0 ){
        lostGame();
        return true;
    }
    return false;
}

function swapLanguage( languageJapanese ){
    let classToAdd    = languageJapanese ? 'japanese' : 'english';
    let classToRemove = languageJapanese ? 'english'  : 'japanese';
    $( '.exit'     ).text( languageJapanese ? '出口'       : 'Exit'      ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.start'    ).text( languageJapanese ? '開始'       : 'Start'     ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.options'  ).text( languageJapanese ? 'オプション' : 'Options'   ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.questions').text( languageJapanese ? '質問'       : 'Questions' ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.answers'  ).text( languageJapanese ? '回答'       : 'Answers'   ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.romaji'   ).text( languageJapanese ? 'ローマ字'   : 'Romaji'    ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.hiragana' ).text( languageJapanese ? '平仮名'     : 'Hiragana'  ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.katakana' ).text( languageJapanese ? '片仮名'     : 'Katakana'  ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.score'    ).text( languageJapanese ? 'スコア'     : 'Score'     ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.correct'  ).text( languageJapanese ? '正しい'     : 'Correct'   ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.restart'  ).text( languageJapanese ? '再起動'     : 'Restart'   ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.menu'     ).text( languageJapanese ? 'メニュー'   : 'Menu'      ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.lives'    ).text( languageJapanese ? '命'         : 'Lives'     ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.speed'    ).text( languageJapanese ? '速度'       : 'Speed'     ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.slow'     ).text( languageJapanese ? 'スロー'     : 'Slow'      ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.medium'   ).text( languageJapanese ? '並'         : 'Medium'    ).addClass( classToAdd ).removeClass( classToRemove );
    $( '.fast'     ).text( languageJapanese ? '速い'       : 'Fast'      ).addClass( classToAdd ).removeClass( classToRemove );
}

/* 
 *  _____________________________________________________________________________________________________________
 * |                                             Cookie Layout                                                   |
 * |_____________________________________________________________________________________________________________|
 * | romajiAnswers | hiraganaAnswers | katakanaAnswers | romajiQuestions | hiraganaQuestions | katakanaQuestions |
 * |             0 |               1 |               2 |               3 |                 4 |                 5 |
 * |_______________|_________________|_________________|_________________|___________________|___________________|
 * |     noRepeats |     showCorrect |        japanese |           lives |             speed |                   |
 * |             6 |               7 |               8 |               9 |                10 |                   |
 * |_______________|_________________|_________________|_________________|___________________|___________________|
 * 
 */

function parseCookie(){
    let cookieName = "gameSettings=";
    let cookies = decodeURIComponent(document.cookie).split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while( cookie.charAt(0) == ' ' ){
            cookie = cookie.substring(1);
        }

        if( cookie.indexOf(cookieName) == 0 ){
            let gameCookie = cookie.substring(cookieName.length, cookie.length);

            for(let i = 0; i < gameCookie.length; i++){
                let cookieValue = gameCookie[i];
                let variableToSet = null;
                switch(i){
                    case 0:
                        variableToSet = 'romajiAnswers';
                        break;
                    case 1:
                        variableToSet = 'hiraganaAnswers';
                        break;
                    case 2:
                        variableToSet = 'katakanaAnswers';
                        break;
                    case 3:
                        variableToSet = 'romajiQuestions';
                        break;
                    case 4:
                        variableToSet = 'hiraganaQuestions';
                        break;
                    case 5:
                        variableToSet = 'katakanaQuestions';
                        break;
                    case 6:
                        variableToSet = 'noRepeats';
                        break;
                    case 7:
                        variableToSet = 'showCorrect';
                        break;
                    case 8:
                        variableToSet = 'language';
                        break;
                    case 9:
                        variableToSet = 'lives';
                        break;
                    case 10:
                        variableToSet = 'speed';
                        break;
                    default:
                        break;
                }
                if( i < 8 ){
                    gameSettings[variableToSet] = cookieValue === '1';
                } else if( i === 8 ){
                    gameSettings[variableToSet] = cookieValue === '1' ? 'japanese' : 'english';
                } else if( i === 9 ){
                    gameSettings[variableToSet] = cookieValue === '1' ? 1 : cookieValue === '3' ? 3 : 5;
                } else if( i === 10 ){
                    gameSettings[variableToSet] = cookieValue === '0' ? 'slow' : cookieValue === '1' ? 'medium' : 'fast';
                }
            }

            if( !gameSettings['romajiAnswers'] ){
                $('.answers-romaji').removeClass( 'enabled' ).addClass( 'disabled' );
            }
            
            if( !gameSettings['hiraganaAnswers'] ){
                $('.answers-hiragana').removeClass( 'enabled' ).addClass( 'disabled' );
            }
            
            if( !gameSettings['katakanaAnswers'] ){
                $('.answers-katakana').removeClass( 'enabled' ).addClass( 'disabled' );
            }
            
            if( gameSettings['romajiQuestions'] ){
                $('.questions-romaji').removeClass( 'disabled' ).addClass( 'enabled' );
            }
            
            if( !gameSettings['hiraganaQuestions'] ){
                $('.questions-hiragana').removeClass( 'enabled' ).addClass( 'disabled' );
            }

            if( !gameSettings['katakanaQuestions'] ){
                $('.questions-katakana').removeClass( 'enabled' ).addClass( 'disabled' );
            }

            if( !gameSettings['showCorrect'] ){
                $('.questions-show-correct').removeClass( 'enabled' ).addClass( 'disabled' );
            }

            if( !gameSettings['noRepeats'] ){
                $('.answers-no-repeat').removeClass( 'enabled' ).addClass( 'disabled' );
            }
            
            $('.button-lives').removeClass('disabled').removeClass('enabled').addClass('disabled');
            $('.button-speed').removeClass('disabled').removeClass('enabled').addClass('disabled');

            currentGame['lives'] = gameSettings['lives'];

            $('.button-lives:nth-of-type(' + (gameSettings['lives']===1?'1':gameSettings['lives']===3?'2':'3') + ')').removeClass('disabled').addClass('enabled');
            $('.button-speed:nth-of-type(' + (gameSettings['speed']==='slow'?'1':gameSettings['speed']==='medium'?'2':'3') + ')').removeClass('disabled').addClass('enabled');

            if( gameSettings['language'] === 'japanese' ){
                swapLanguage(true);
                $('.language-switcher').text( 'English' );
                $('.language-switcher').removeClass( 'japanese' );
                $('.language-switcher').addClass( 'english' );
            }
        }
    }
}

function saveCookie(){
    let expires = new Date();
    let cookieValue = '';
    cookieValue += gameSettings[    'romajiAnswers'] ? '1' : '0';
    cookieValue += gameSettings[  'hiraganaAnswers'] ? '1' : '0';
    cookieValue += gameSettings[  'katakanaAnswers'] ? '1' : '0';
    cookieValue += gameSettings[  'romajiQuestions'] ? '1' : '0';
    cookieValue += gameSettings['hiraganaQuestions'] ? '1' : '0';
    cookieValue += gameSettings['katakanaQuestions'] ? '1' : '0';
    cookieValue += gameSettings[        'noRepeats'] ? '1' : '0';
    cookieValue += gameSettings[      'showCorrect'] ? '1' : '0';
    cookieValue += gameSettings[         'language'] === 'japanese' ? '1' : '0';
    cookieValue += gameSettings[            'lives'] === 1 ? '1' : gameSettings['lives'] === 3 ? '3' : '5';
    cookieValue += gameSettings[            'speed'] === 'slow' ? '0' : gameSettings['speed'] === 'medium' ? '1' : '2';

    expires.setTime(expires.getTime() + 2592000000);
    document.cookie = "gameSettings=" + cookieValue + ";expires=" + expires.toUTCString() + ";path=/";
}

$(document).ready(function(){
    parseCookie();

    $('.game-input-answer').prop('disabled',true);

    $('.language-switcher').click( function(){
        let languageJapanese;
        if( $(this).hasClass('japanese') ){
            $(this).text("English");
            $(this).removeClass('japanese');
            $(this).addClass('english');
            languageJapanese = true;
        } else {
            $(this).text("日本語");
            $(this).removeClass('english');
            $(this).addClass('japanese');
            languageJapanese = false;
        }
        swapLanguage( languageJapanese );
        gameSettings['language'] = languageJapanese ? 'japanese' : 'english';
        saveCookie();
    });

    $('.start').click( function(){
        $('.game-main-menu').fadeOut({
            duration: 500, 

            complete: function(){
                newRound(true);
                $('.game-play-field-wrapper').css('display','flex').hide().fadeIn(250);
            }
        });
    });

    $('.options').click( function(){
        $('.game-main-menu').fadeOut({
            duration: 500,

            complete: function(){
                $('.game-options-menu').css('display','flex').hide().fadeIn(250);
            }
        });
    });

    $('.exit').click( function(){
        $('.game-options-menu').fadeOut({
            duration: 500,

            complete: function(){
                $('.game-main-menu').hide().fadeIn(250);
            }
        });
    });

    $('.restart').click( function(){
        $('.game-over').fadeOut({
            duration: 500,

            complete: function(){
                newRound(true);
                $('.game-play-field-wrapper').css('display','flex').hide().fadeIn(250);
            }
        });
    });

    $('.menu').click( function(){
        $('.game-over').fadeOut({
            duration: 500,
            
            complete: function(){
                $('.game-main-menu').hide().fadeIn(250);
            }
        });
    });

    $('.game-options-medium-button').click( function(){
        if( $(this).hasClass('button-lives') ){
            $('.button-lives').removeClass('disabled').removeClass('enabled').addClass('disabled');
            $(this).removeClass('disabled');
            $(this).addClass('enabled');
            gameSettings['lives'] = $(this).text().trim() === "1"
                                        ? 1
                                        : $(this).text().trim() === "3"
                                            ? 3 : 5;
        } else {
            $('.button-speed').removeClass('disabled').removeClass('enabled').addClass('disabled');
            $(this).removeClass('disabled');
            $(this).addClass('enabled');
            gameSettings['speed'] = $(this).text().trim() === "Slow"
                                        ? 'slow'
                                        : $(this).text().trim() === "Medium" 
                                            ? 'medium' : 'fast';
        }

        saveCookie();
    });

    $('.game-options-tiny-button').click(function(){

        $(this).toggleClass('enabled').toggleClass('disabled');
        
        if( $(this).hasClass('answers-romaji') ){
            gameSettings['romajiAnswers'] = $(this).hasClass('enabled');
        } else if( $(this).hasClass('answers-hiragana') ){
            gameSettings['hiraganaAnswers'] = $(this).hasClass('enabled');
        } else if( $(this).hasClass('answers-katakana') ){
            gameSettings['katakanaAnswers'] = $(this).hasClass('enabled');
        } else if( $(this).hasClass('questions-romaji') ){
            gameSettings['romajiQuestions'] = $(this).hasClass('enabled');
        } else if( $(this).hasClass('questions-hiragana') ){
            gameSettings['hiraganaQuestions'] = $(this).hasClass('enabled');
        } else if( $(this).hasClass('questions-katakana') ){
            gameSettings['katakanaQuestions'] = $(this).hasClass('enabled');
        } else if( $(this).hasClass('questions-show-correct') ){
            gameSettings['showCorrect'] = $(this).hasClass('enabled');
        } else if( $(this).hasClass('answers-no-repeat') ){
            gameSettings['noRepeats'] = $(this).hasClass('enabled');
        }

        saveCookie();
    });

    $(document).on( 'keyup', function( event ){
        switch( event.which ){
            // If Esc was pressed
            case 27:
                if( !$('.game-main-menu').is(":visible") ){
                    $( '.game-countdown-timer' ).stop(true,false).removeClass('down').removeAttr('style')
                    $( '.game-options-menu'       ).fadeOut(500);
                    $( '.game-play-field-wrapper' ).fadeOut(500);
                    $( '.game-over'               ).fadeOut(500);
                    $( '.game-main-menu' ).delay(500).hide().fadeIn(250);
                }
                break;
            default:
                break;
        }
    });

    $('.game-input-answer').on( 'keypress', function( event ){
        // If Enter was pressed
        if( event.which === 13 && $('.game-input-answer').val() !== "" ){
            roundOver();
        }
    });
    
});
