import DomUtils from '../src/library/DomUtils.js';
import PageFactory from '../src/library/PageFactory.js';
import ReactRenderHelper from '../src/library/ReactRenderHelper.js';
import ReactUtils from '../src/library/ReactUtils.js';
import OverlayCreator from '../src/library/OverlayCreator.js';
import ModalFactory from '../src/library/ModalFactory.js';


xdescribe('File ReactRenderHelper.js', function(){

    test('function displaySelectedPage',async  function(){
        //arrange
        let pageName = 'about-us';
        let div = document.createElement('DIV');
        div.id = 'page';
        document.body.appendChild(div);

        PageFactory.setStylePagePromise = jest.fn(function(){
            return 'ok';
        });
        DomUtils.addEventListenerForWindowResizeParams = jest.fn();
        //act
        var result = await ReactRenderHelper.displaySelectedPage(pageName);
        //assert
        expect(PageFactory.setStylePagePromise).toHaveBeenCalledTimes(2);

    });

    test('function goHomePage set style is called 1 time', function(){
        //arrange
        PageFactory.setStylePagePromise = jest.fn();
        ReactUtils.unmountComponentPromise = jest.fn();
        //act
        ReactRenderHelper.goHomePage();
        //assert
        expect(PageFactory.setStylePagePromise).toHaveBeenCalledTimes(1);
    });


    test('function displaySelectedModal', async function(){
        //arrange
        let modalName = 'test';
        DomUtils.addEventListenerForWindowResizeParams = jest.fn();
        OverlayCreator.FactoryCreateBackgroundLayerPromise = jest.fn(function(){
            var promise = new Promise(function(resolve, reject){
                resolve('ok');
            });
            return promise;
        });
        OverlayCreator.setStyleBackgroundLayerPromise = jest.fn(function(){
            var promise = new Promise(function(resolve, reject){
                resolve('style-ok')
            });
            return promise;
        });
        ModalFactory.FactoryCreateModalPromise = jest.fn(function(){
            var promise = new Promise(function(resolve, reject){               
                resultExpect();
                resolve('modal-ok')
            });
            return promise;
        });
        //act
        await ReactRenderHelper.displaySelectedModal(modalName)
        
        //assert        
        function resultExpect(){
            expect(ModalFactory.FactoryCreateModalPromise).toHaveBeenCalledTimes(1);
        }
       
    });

    test('function closeSelectedModal closes modal ok',async function(){

        //arrange
        let modalName = 'test';
        DomUtils.removeEventListenerForWindowResizeParams = jest.fn();
        ReactUtils.unmountComponentPromise = jest.fn(function(){
            var promise = new Promise(function(resolve, reject){
                resolve('ok');
            });
            return promise;
        });
        //act
        var result = await ReactRenderHelper.closeSelectedModal(modalName);
        //assert
        expect(ReactUtils.unmountComponentPromise).toHaveBeenCalledTimes(2);
    });
});