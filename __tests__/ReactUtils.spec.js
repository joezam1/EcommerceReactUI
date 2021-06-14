import ReactUtils from '../src/library/ReactUtils.js';


xdescribe('File ReactUtils', function(){
    test('function unmountComponentPromise notification on unmount: component-unmounted-ok', async function(){
        //arrange
        let div = document.createElement('DIV');
        div.id = 'target';
        document.body.appendChild(div);
        //act
        var result = await ReactUtils.unmountComponentPromise(div.id);
        //assert
        expect(result).toBe('component-unmounted-ok');

    });
});