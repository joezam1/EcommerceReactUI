import "regenerator-runtime/runtime";

import DomUtils from '../src/library/DomUtils.js'
import OverlayCreator from '../src/library/OverlayCreator.js';


xdescribe('File OverlayCreator.js', function(){
    test("function FactoryCreateBackgroundLayerPromise returns style color black", async function(){
        //arrange
        let id = 'target-id'
        let div = document.createElement('DIV');
        div.id = id;
        document.body.appendChild(div);
        let className ='background-class';
        let color = 'black';
        
        //act
        var result = await OverlayCreator.FactoryCreateBackgroundLayerPromise(id, className, color);
        //assert
        let selectedColor = 'black';
        expect(result.color).toBe(selectedColor);
    });

    test('function setStyleBackgroundLayerPromise sets styles ok',async function(){
        //arrange
        let className ='background-class';
        let color = 'black';
        let id = 'target-id'
        let div = document.createElement('DIV');
        div.id = id;
        div.classList.add(className);
        document.body.appendChild(div);
        DomUtils.getBrowserCurrentSize = jest.fn();
        DomUtils.setSizeHtmlElementByClassName = jest.fn();

        //act
        let result = await OverlayCreator.setStyleBackgroundLayerPromise(className, color);
        //assert
        let expectedResult = 'backgroundLayer-display-ok';
        expect(result).toBe(expectedResult);
    });
});