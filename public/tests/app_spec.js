// testはこうやってdescribe して、expectする。
// 少しわかりにくいのが、learnjs.showView('')で
// これは、app.jsにある無名関数を呼び出している。
// 後ろのカッコがfunctionの後ろの引数をになってる。
describe('LearnJS', function() {
    it('show the landing page view when there is no hash', function(){
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });

    it('can show a problem view', function(){
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    });
});