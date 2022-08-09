'use strict';
var learnjs = {};

learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem() {return __;}"
    },
    {
        description: "Simple math",
        code: "function problem() {return 42 === 6 * __;}"
    }
];

learnjs.showView = function(hash) {
    var routes = {
        '#problem':learnjs.problemView
    };

    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]]
    if (viewFn) {
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
};

learnjs.flashElement = function(elem,content){
    elem.fadeOut('fast',function(){
        elem.html(content);
        elem.fadeIn();
    });
}

learnjs.problemView = function(data) {
    var problemNumber = parseInt(data,10);
    var view = $('.templates .problem-view').clone();
    var problemData = learnjs.problems[problemNumber -1];
    var resultFlash = view.find('.result')

    function checkAnswer() {
        var answer = view.find('.answer').val();
        var test   = problemData.code.replace('__',answer) + ';problem();'
        return eval(test);
    }

    function checkAnswerClick() {
        if (checkAnswer()){
            var correctFlash = learnjs.buildCorrectFlash(problemNumber);
            learnjs.flashElement(resultFlash,correctFlash);
        }else{
            learnjs.flashElement(resultFlash,'Incorrect!');
        }
        return false;
    }

    view.find('.check-btn').click(checkAnswerClick)
    view.find('.title').text('Problem #' + problemNumber);
    learnjs.applyObject(problemData,view);
    return view;
};

learnjs.buildCorrectFlash = function(problemNumber) {
    var correctFlash = learnjs.template('correct-flash');
    var link = correctFlash.find('a');
    if (problemNumber < learnjs.problems.length) {
        link.attr('href', '#problem-' + (problemNumber + 1));
    } else {
        link.attr('href', '');
        link.text("You're Finished!");
    }
    return correctFlash;
};

learnjs.appOnReady = function() {
    window.onhashchange = function() {
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);
};


learnjs.applyObject = function(obj,elem) {
    for (var key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
};

learnjs.template = function(name) {
    return $('.templates .' + name).clone();
};


// learnjs.problemView = function() {
//     return $('<div class="problem-view">').text('Coming soon!');
// }

// routesは連想配列として、引数であるhashを用いて
// routes[hash]で一致する#problem-1に合致する
// valueをviewFnにセットして、中身が空なら何もしない。
// からじゃなければ、view-containerの子要素である'landing-view'を空にして、viewFn
// の中身であるlearnjs.problemViewを実行してHtmlを書き換えている。
// learnjs.showView = function(hash) {
//     console.log(hash)
//     var routes = {
//         '#problem-1':learnjs.problemView
//     };

//     var viewFn = routes[hash];
//     if (viewFn) {
//         $('.view-container').empty().append(viewFn());
//     }
// };

// learnjs.problemView = function(problemNumber) {
//     var title = 'Problem #' + problemNumber + ' Coming soon!'; 
//     return $('<div class="problem-view">').text(title);
// }
