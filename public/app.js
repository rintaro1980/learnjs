'use strict';
var learnjs = {};

learnjs.problemView = function() {
    return $('<div class="problem-view">').text('Coming soon!');
}

// routesは連想配列として、引数であるhashを用いて
// routes[hash]で一致する#problem-1に合致する
// valueをviewFnにセットして、中身が空なら何もしない。
// からじゃなければ、view-containerの子要素である'landing-view'を空にして、viewFn
// の中身であるlearnjs.problemViewを実行してHtmlを書き換えている。
learnjs.showView = function(hash) {
    console.log(hash)
    var routes = {
        '#problem-1':learnjs.problemView
    };

    var viewFn = routes[hash];
    if (viewFn) {
        $('.view-container').empty().append(viewFn());
    }
};