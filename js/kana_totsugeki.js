/// <reference path="../typings/index.d.ts" />

var questions = {
    a: {
        katakana: "ア",
        hiragana: "あ"
    },
    i: {
        katakana: "イ",
        hiragana: "い"
    },
    u: {
        katakana: "ウ",
        hiragana: "う"
    },
    e: {
        katakana: "エ",
        hiragana: "え"
    },
    o: {
        katakana: "オ",
        hiragana: "お"
    },
    
    ka: {
        katakana: "カ",
        hiragana: "か"
    },
    ki: {
        katakana: "キ",
        hiragana: "き"
    },
    ku: {
        katakana: "ク",
        hiragana: "く"
    },
    ke: {
        katakana: "ケ",
        hiragana: "け"
    },
    ko: {
        katakana: "コ",
        hiragana: "こ"
    },

    sa: {
        katakana: "サ",
        hiragana: "さ"
    },
    shi: {
        katakana: "シ",
        hiragana: "し"
    },
    su: {
        katakana: "ス",
        hiragana: "す"
    },
    se: {
        katakana: "セ",
        hiragana: "せ"
    },
    so: {
        katakana: "ソ",
        hiragana: "そ"
    },

    ta: {
        katakana: "タ",
        hiragana: "た"
    },
    chi: {
        katakana: "チ",
        hiragana: "ち"
    },
    tsu: {
        katakana: "ツ",
        hiragana: "つ"
    },
    te: {
        katakana: "テ",
        hiragana: "て"
    },
    to: {
        katakana: "ト",
        hiragana: "と"
    },

    na: {
        katakana: "ナ",
        hiragana: "な"
    },
    ni: {
        katakana: "ニ",
        hiragana: "に"
    },
    nu: {
        katakana: "ヌ",
        hiragana: "ぬ"
    },
    ne: {
        katakana: "ネ",
        hiragana: "ね"
    },
    no: {
        katakana: "ノ",
        hiragana: "の"
    },

    ha: {
        katakana: "ハ",
        hiragana: "は"
    },
    hi: {
        katakana: "ヒ",
        hiragana: "ひ"
    },
    fu: {
        katakana: "フ",
        hiragana: "ふ"
    },
    he: {
        katakana: "ヘ",
        hiragana: "へ"
    },
    ho: {
        katakana: "ホ",
        hiragana: "ほ"
    },
    
    ma: {
        katakana: "マ",
        hiragana: "ま"
    },
    mi: {
        katakana: "ミ",
        hiragana: "み"
    },
    mu: {
        katakana: "ム",
        hiragana: "む"
    },
    me: {
        katakana: "メ",
        hiragana: "め"
    },
    mo: {
        katakana: "モ",
        hiragana: "も"
    },

    ya: {
        katakana: "ヤ",
        hiragana: "や"
    },
    yu: {
        katakana: "ユ",
        hiragana: "ゆ"
    },
    yo: {
        katakana: "ヨ",
        hiragana: "よ"
    },
    
    ra: {
        katakana: "ラ",
        hiragana: "ら"
    },
    ri: {
        katakana: "リ",
        hiragana: "り"
    },
    ru: {
        katakana: "ル",
        hiragana: "る"
    },
    re: {
        katakana: "レ",
        hiragana: "れ"
    },
    ro: {
        katakana: "ロ",
        hiragana: "ろ"
    },

    wa: {
        katakana: "ワ",
        hiragana: "わ"
    },
    wo: {
        katakana: "ヲ",
        hiragana: "を"
    },
    
    n: {
        katakana: "ン",
        hiragana: "ん"
    }
};

var gameSettings = {
    'hiraganaQuestions' : true,
    'katakanaQuestions' : true,
    'romajiQuestions' : false,
    'hiraganaAnswers' : true,
    'katakanaAnswers' : true,
    'romajiAnswers' : true,
    'lives' : 3,
    'language' : 'english',
    'speed' : 'medium'
};

var currentGame = {
    'display' : '',
    'answers'  : {
        'romaji' : '',
        'hiragana' : '',
        'katakana' : ''
    },
    'score' : 0,
    'lives' : 3,
    'correct' : 0
};

function newRound( firstRun ){
    if(firstRun){
        currentGame['lives'] = gameSettings['lives'];
        currentGame['correct'] = 0;
        for(let i = 0; i < 5; i++){
            $('.game-heart:nth-of-type(' + (i+1) + ')').removeClass('down').show().children('i').removeClass('fa-heart-o').removeClass('fa-heart').addClass('fa-heart');
            if(i > currentGame['lives']-1){
                $('.game-heart:nth-of-type(' + (i+1) + ')').hide();
            }
        }

        currentGame['score'] = 0;
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
    setTimeout(function(){
        $('.game-input-answer').focus();
    }, 500);

    let questionKey = (Object.keys(questions))[Math.floor(Math.random() * Object.keys(questions).length)];
    let question = questions[questionKey];
    currentGame['answers']['hiragana'] = question['hiragana'];
    currentGame['answers']['katakana'] = question['katakana'];
    currentGame['answers']['romaji'] =  questionKey;


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

    $('.game-countdown-timer').stop(true,false).removeClass('down').removeAttr('style').delay(firstRun?250:0).animate({
        left: -$(this).width()
    },
    {
        duration: gameSettings['speed']==='fast'?2500:gameSettings['speed']==='medium'?5000:7500, 
        easing: "linear",
        step: function(now, fx){
            if(Math.abs(now) >= Math.abs(fx.end)/6){
                $(this).addClass('down');
            }
        },
        complete: function(){
            if(checkAnswer()){
                currentGame['correct']++;
                updateScore(true);
                newRound(false);
            } else {
                updateScore(false);
                if(!lostLife()){
                    newRound(false);
                }
            }
            $(this).removeClass('down');
        }
    });
}

function checkAnswer(){
    let userAnswer = $('.game-input-answer').val().toLowerCase();
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
    $('.game-score').stop(true,true).removeAttr('style').addClass(wonRound?'up':'down').animate({
        fakevalue: currentGame['score']
    },{
        duration: 1000,
        step: function(now,fx){
            $(this).text(Math.floor(now));
        },
        complete: function(){
            $(this).removeClass('up');
            $(this).removeClass('down');
        }
    });
}

function lostGame(){
    $('.game-countdown-timer').stop(true,false).removeAttr('style');

    $('.final-score').text(currentGame['score']);
    $('.final-correct').text(currentGame['correct']);
    $('.game-play-field-wrapper').fadeOut(500);
    $('.game-over').delay(500).css('display','flex').hide().fadeIn(250);
    currentGame['lives'] = gameSettings['lives'];
    currentGame['score'] = 0;
    currentGame['correct'] = 0;
    $('.game-score').stop(true,true);
}

function lostLife(){
    $('.game-heart:nth-child(' + currentGame['lives'] + ')').addClass('down').children('i').removeClass('fa-heart').addClass('fa-heart-o');
    currentGame['lives']--;
    if(currentGame['lives'] === 0){
        lostGame();
        return true;
    }
    return false;
}

function swapLanguage( languageJapanese ){
    let classToAdd    = languageJapanese?'japanese':'english';
    let classToRemove = languageJapanese?'english':'japanese';
    $('.exit').text(languageJapanese?'出口':'Exit').addClass(classToAdd).removeClass(classToRemove);
    $('.start').text(languageJapanese?'開始':'Start').addClass(classToAdd).removeClass(classToRemove);
    $('.options').text(languageJapanese?'オプション':'Options').addClass(classToAdd).removeClass(classToRemove);
    $('.questions').text(languageJapanese?'質問':'Questions').addClass(classToAdd).removeClass(classToRemove);
    $('.answers').text(languageJapanese?'回答':'Answers').addClass(classToAdd).removeClass(classToRemove);
    $('.romaji').text(languageJapanese?'ローマ字':'Romaji').addClass(classToAdd).removeClass(classToRemove);
    $('.hiragana').text(languageJapanese?'平仮名':'Hiragana').addClass(classToAdd).removeClass(classToRemove);
    $('.katakana').text(languageJapanese?'片仮名':'Katakana').addClass(classToAdd).removeClass(classToRemove);
    $('.score').text(languageJapanese?'スコア':'Score').addClass(classToAdd).removeClass(classToRemove);
    $('.correct').text(languageJapanese?'正しい':'Correct').addClass(classToAdd).removeClass(classToRemove);
    $('.restart').text(languageJapanese?'再起動':'Restart').addClass(classToAdd).removeClass(classToRemove);
    $('.menu').text(languageJapanese?'メニュー':'Menu').addClass(classToAdd).removeClass(classToRemove);
    $('.lives').text(languageJapanese?'命':'Lives').addClass(classToAdd).removeClass(classToRemove);
    $('.speed').text(languageJapanese?'速度':'Speed').addClass(classToAdd).removeClass(classToRemove);
    $('.slow').text(languageJapanese?'スロー':'Slow').addClass(classToAdd).removeClass(classToRemove);
    $('.medium').text(languageJapanese?'並':'Medium').addClass(classToAdd).removeClass(classToRemove);
    $('.fast').text(languageJapanese?'速い':'Fast').addClass(classToAdd).removeClass(classToRemove);
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
            
            $('.button-lives').removeClass('disabled').removeClass('enabled').addClass('disabled');
            $('.button-speed').removeClass('disabled').removeClass('enabled').addClass('disabled');

            $('.button-lives:nth-of-type(' + (gameSettings['lives']===1?'1':gameSettings['lives']===3?'2':'3') + ')').removeClass('disabled').addClass('enabled');
            $('.button-speed:nth-of-type(' + (gameSettings['speed']==='slow'?'1':gameSettings['speed']==='medium'?'2':'3') + ')').removeClass('disabled').addClass('enabled');

            if(gameSettings['language'] === 'japanese'){
                swapLanguage(true);
                $('.language-switcher').text("English");
                $('.language-switcher').removeClass('japanese');
                $('.language-switcher').addClass('english');
            }
        }
    }
    currentGame['lives'] = gameSettings['lives'];

    $('.language-switcher').click(function(){
        let languageJapanese;
        if($(this).hasClass('japanese')){
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
        swapLanguage(languageJapanese);
        gameSettings['language'] = languageJapanese?'japanese':'english';
        let expires = new Date();
        expires.setTime(expires.getTime() + 2592000000);
        document.cookie = "gameSettings=" + JSON.stringify(gameSettings) + ";expires=" + expires.toUTCString() + ";path=/";
    });

    $('.start').click(function(){
        $('.game-main-menu').fadeOut(500);
        $('.game-play-field-wrapper').delay(500).css('display','flex').hide().fadeIn(250);
        newRound(true);
    });

    $('.options').click(function(){
        $('.game-main-menu').fadeOut(500);
        $('.game-options-menu').delay(500).css('display','flex').hide().fadeIn(250);
    });

    $('.exit').click(function(){
        $('.game-options-menu').fadeOut(500);
        $('.game-main-menu').delay(500).fadeIn(250);
    });

    $('.restart').click(function(){
        $('.game-over').fadeOut(500);
        $('.game-play-field-wrapper').delay(500).css('display','flex').hide().fadeIn(250);
        newRound(true);
    });

    $('.menu').click(function(){
        $('.game-over').fadeOut(500);
        $('.game-main-menu').delay(500).fadeIn(250);
    });

    $('.game-options-medium-button').click(function(){
        if($(this).hasClass('button-lives')){
            $('.button-lives').removeClass('disabled').removeClass('enabled').addClass('disabled');
            $(this).removeClass('disabled');
            $(this).addClass('enabled');
            gameSettings['lives'] = $(this).text().trim()==="1"?1:$(this).text().trim()==="3"?3:5;
        } else {
            $('.button-speed').removeClass('disabled').removeClass('enabled').addClass('disabled');
            $(this).removeClass('disabled');
            $(this).addClass('enabled');
            gameSettings['speed'] = $(this).text().trim()==="Slow"?'slow':$(this).text().trim()==="Medium"?'medium':'fast';
        }
        let expires = new Date();
        expires.setTime(expires.getTime() + 2592000000);
        document.cookie = "gameSettings=" + JSON.stringify(gameSettings) + ";expires=" + expires.toUTCString() + ";path=/";
    });

    $('.game-options-tiny-button').click(function(){
        $(this).toggleClass('enabled').toggleClass('disabled');
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
                    $('.game-countdown-timer').stop(true,false).removeClass('down').removeAttr('style')
                    $('.game-options-menu').fadeOut(500);
                    $('.game-play-field-wrapper').fadeOut(500);
                    $('.game-over').fadeOut(500);
                    $('.game-main-menu').delay(500).fadeIn(250);
                }
                break;
        }
    });

    $('.game-input-answer').on('keypress', function (e) {
        //If Enter was pressed
        if(e.which === 13 && $('.game-input-answer').val() !== "") {
            if(checkAnswer()){
                currentGame['correct']++;
                updateScore(true);
                newRound(false);
            } else {
                updateScore(false);
                if(!lostLife()){
                    newRound(false);
                }
            }
        }
    });
});
