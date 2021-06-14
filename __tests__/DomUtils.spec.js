import DomUtils from '../src/library/DomUtils.js';


xdescribe('File DomUtils.js', function(){ 
    test('function setSizeHtmlElementByClassName sets width correctly', function(){
        //arrange
        let div = document.createElement("DIV");
        div.classList.add('target');
        div.id = 'target-id';
        document.body.appendChild(div);
        let mockBrowserSize = {width: 100, height: 150};
        let dynamicMarginDiv = 20;
        var elemen = document.getElementsByClassName('target');
        var elemen1 = document.getElementById('target-id');
        //act
        DomUtils.setSizeHtmlElementByClassName('target',mockBrowserSize, dynamicMarginDiv);
        //assert
        let divWidth = div.style.width;
        let expectedWidth = ''+ (mockBrowserSize.width - dynamicMarginDiv) + 'px';
        expect(divWidth).toBe(expectedWidth);
    });

    test('function getBrowserSize() returns width = 50', function(){
        //arrange
        DomUtils.getBrowserCurrentSize = jest.fn(function(){
            var size = {
                height:100,
                width:50
            }
            return size
        });
        //act
        var result = DomUtils.getBrowserCurrentSize();
        //assert
        expect(result.width).toBe(50);
    });

    test('function setElementAddRemoveClasses classNames are added and removed', function(){
        //arrange
        let element = document.createElement('IMG');
        element.classList.add('sliding-image');
        element.classList.add('hide');
        let elementClone = element.cloneNode(true);            
        //act
        DomUtils.setElementAddRemoveClasses(element,'display','hide');
        let result = element.className;
        let resultInfo = result.includes('display');
        //assert
        expect(resultInfo).toEqual(true);
    });

    test('function addClassNameToClassListById adds class name "onDisplay" to target id', function(){
        //arrange
        let className = 'onDisplay';
        let div1 = document.createElement('DIV');
        div1.id = 1;
        div1.classList.add('target');
        div1.classList.add('hide');
        
        let div2 = document.createElement('DIV');
        div2.id = 2;
        div2.classList.add('target');
        div2.classList.add('hide');
        
        let div3 = document.createElement('DIV');
        div3.id = 3;
        div3.classList.add('target');
        div3.classList.add(className);
        
        let div4 = document.createElement('DIV');
        div4.id = 4;
        div4.classList.add('target');
        div4.classList.add('hide');
        
        let div5 = document.createElement('DIV');
        div5.id = 5;
        div5.classList.add('target');
        div5.classList.add('hide');

        document.body.appendChild(div1);
        document.body.appendChild(div2);
        document.body.appendChild(div3);
        document.body.appendChild(div4);
        document.body.appendChild(div5);

        //act
        DomUtils.addClassNameToClassListById(1,'target',className)
        //assert
        let div1SelectedClassName = '';       
        for(var a =0;a < div1.classList.length; a++)
        {
            if(div1.classList[a] ===className){
                div1SelectedClassName = 'onDisplay';
            }
        }
        
        let div3SelectedClassName = '';       
        for(var a =0;a < div3.classList.length; a++)
        {
            if(div3.classList[a] ===className){
                div3SelectedClassName = 'onDisplay';
            }
        }
        expect(div1SelectedClassName).toBe(className);
        expect(div3SelectedClassName).toBe('');
    })

    test('function removeClassNameFromClassList removes class onDisplay', function(){
        //arrange
        let className = 'onDisplay';
        let div1 = document.createElement('DIV');
        div1.id = 1,
        div1.classList.add('target');
        div1.classList.add(className);

        let div2 = document.createElement('DIV');
        div2.id = 2,
        div2.classList.add('target');
        div2.classList.add(className);

        let div3 = document.createElement('DIV');
        div3.id = 3,
        div3.classList.add('target');
        div3.classList.add(className);

        let div4 = document.createElement('DIV');
        div4.id = 4,
        div4.classList.add('target');
        div4.classList.add(className);

        let div5 = document.createElement('DIV');
        div5.id = 5,
        div5.classList.add('target');
        div5.classList.add(className);

        document.body.appendChild(div1);
        document.body.appendChild(div2);
        document.body.appendChild(div3);
        document.body.appendChild(div4);
        document.body.appendChild(div5);
        //act

        DomUtils.removeClassNameFromClassList('target',className);
        //assert
        let selectedClassName = '';
        for(var a ; a < div1.classList.length; a++){
            if(div1.classList[a] === className){
                selectedClassName = className;
            }
        }
        expect(selectedClassName).toBe('');
    })

});