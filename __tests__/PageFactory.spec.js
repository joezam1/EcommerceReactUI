
import PageFactory from '../src/library/PageFactory.js';



xdescribe('File PageFactory.js',function(){
    test('function FactoryCreatePagePromise creates page true', async function(){
        //arrange
        let pageName = 'about-us';
        let div = document.createElement('DIV');
        div.id = 'page';
        document.body.appendChild(div);
        //act
        let result = await PageFactory.FactoryCreatePagePromise(pageName);
        //assert
        expect(result).toBe(true);
    });

    test('function setStylePagePromise', function(){
        
    });
});