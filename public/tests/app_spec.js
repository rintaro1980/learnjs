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

    it('involes the router when loaded', function(){
        spyOn(learnjs, 'showView'); //spyOnで（オブジェクト、’メソッド’）のメソッドを監視
        learnjs.appOnReady();
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });

    it('subscribe to the hash change event', function(){
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });


    describe('problem view', function() {
        it('has a title that includes the problem number', function(){
            var view = learnjs.problemView('1');
            expect(view.text()).toEqual('Problem #1 Coming soon!');
        });

        it('passes the hash view parameter to the view function', function(){
            spyOn(learnjs,'problemView');
            learnjs.showView('#problem-42');
            expect(learnjs.problemView).toHaveBeenCalledWith('42');
        });
    
    });
});

describe('answer section', function() {
    it('can check a correct answer by hitting a button', function(){
        var view = learnjs.problemView('1');
        view.find('.answer').val('true');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Correct!');
    });

    it('rejects an incorrect answer', function(){
        var view = learnjs.problemView('1');
        view.find('.answer').val('false');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Incorrect!');
    });

});


