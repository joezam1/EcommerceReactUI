import Utils from '../src/library/Utils.js';

xdescribe('function isValidJson', function(){
    test('invalid json object returns false', function(){
        let invalidObjStr = 'this is a phrase';
        let result = Utils.isValidJson(invalidObjStr);
        expect(result).toBe(false);
    });
    test('valid json object returns true', function(){
        let validObjStr = '{"name":"test"}';
        let result = Utils.isValidJson(validObjStr);
        expect(result).toBe(true);
    })
});

xdescribe('function jsonSafeParse', function(){
    test('safe parse returns empty string', function(){
        let invalidObjStr = 'this is a phrase';
        let result = Utils.jsonSafeParse(invalidObjStr);
        let emptyString = '';
        expect(result).toBe(emptyString);
    });
    test('',function(){
        let validObjStr = '{"name":"test"}';
        let result = Utils.isValidJson(validObjStr);
        var isJsonObj = (typeof result === 'object') ? true: false;
        expect(isJsonObj).toBe(true);
    });

});

xdescribe('function isValid',function(){
    test('null input equals false ',function(){
        let input = null;
        let result = Utils.isValid(input);
        expect(result).toEqual(false);
    });

    test('undefined input equals false ',function(){
        let input = undefined;
        let result = Utils.isValid(input);
        expect(result).toEqual(false);
    });
});

xdescribe('function inputIsString', function(){
    test('input is number, result is false', function(){
        let input = 0;
        let result = Utils.inputIsString(input);
        expect(result).toBe(false);
    });

    test('input is string, result is true', function(){
        let input = "0";
        let result = Utils.inputIsString(input);
        expect(result).toBe(true);
    });
})

xdescribe('function inputIsNumber', function(){
    test('input is number, result is true', function(){
        let input = 0;
        let result = Utils.inputIsNumber(input);
        expect(result).toBe(true);
    });

    test('input is string, result is false', function(){
        let input = "0";
        let result = Utils.inputIsNumber(input);
        expect(result).toBe(false);
    });
})

xdescribe('function inputIsObject', function(){
    test('input is not object, result is false', function(){
        let input = "this is a test";
        let result = Utils.inputIsObject(input);
        expect(result).toBe(false);
    });

    test('input is not object, result is true', function(){
        let input ={"name":"test"}
        let result = Utils.inputIsObject(input);
        expect(result).toBe(true);
    });
});

xdescribe('function updateObjectProperty',function(){
    test('property is updated', function(){
        let targetObj = {
            name:'john',
            age:22
        }
        let updatedObj ={
            age:25
        }
        let result = Utils.updateObjectProperty(targetObj,updatedObj);
        expect(result.updatedObject.age).toBe(25);
    })

    test('property is inserted in object', function(){
        let prop1 = {name:'john'};
        let prop2 = {age:25};
        let prop3 = {address:'King St'}
        let propArray = [prop1, prop2, prop3];
        let emptyObj = {}

        let result = Utils.addPropertyToObject(emptyObj,propArray);

        expect(result.age).toBe(25);

    });
});

xdescribe('function updateTargetObject', function(){
    test('object property is updated', function(){
        let targetObj = {
            name:'john',
            age:22
        }
        let updatedObj ={
            age:25,
            address:'king st'
        }
        let result = Utils.updateTargetObject(targetObj,updatedObj);
        expect(result.age).toBe(25);
        expect(result.address).toBe('king st');
    });
});

