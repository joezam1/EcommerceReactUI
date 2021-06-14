
//tested--
var isValidJson = function(stringValue){

    try{
        var result = JSON.parse(stringValue);
    }catch(ex){
        console.log(ex);
        return false;
    }
    return true;
}

//test
var jsonSafeParse = function(stringValue){

    var result = "";
    try{
        result = JSON.parse(stringValue);
    }catch(ex){
        console.log(ex);
    }
    return result;
}

//tested--
var isValid = function(selectedInput){
    if(selectedInput !=null && selectedInput !== undefined && selectedInput !='')
    {
        return true;
    }
    return false;
}

//tested--
var inputIsString = function(selectedInput){
   var isTypeString = (typeof selectedInput === 'string');
   return isTypeString;
}

//tested--
var inputIsNumber = function(selectedInput){
    if(!isNaN(selectedInput) && typeof selectedInput === 'number' ){
        return true;
    }
    return false;
}

//tested--
function inputIsObject(input){
  if(typeof input === 'object' && !Array.isArray(input) && input !== null){
     return true;
  }
  return false;
}

//tested--
function updateTargetObject(targetObj, updaterObj){ 
  let result = updateObjectProperty(targetObj, updaterObj);
  let updatedObject = addPropertyToObject(result.updatedObject, result.propertiesNotUpdatedArray);
  return updatedObject;
}

//tested--
function updateObjectProperty(targetObj, updaterObj){
  let updatedObject = Object.assign({}, targetObj);
  let propertiesNotUpdatedArray = [];
  for(let key in updaterObj){     
    let targetUpdated = false;       
    if(updaterObj.hasOwnProperty(key)){   
      for(var key1 in updatedObject){
        if(updatedObject.hasOwnProperty(key1)){
          if(key === key1){
            updatedObject[key1] = updaterObj[key];
              targetUpdated = true;
              break;
          }

          let value1 = updatedObject[key1];
          if(inputIsObject (value1 )){
            updateObjectProperty(value1, updaterObj);
          }               
        }
      }
    }

    if(!targetUpdated){
      var newKeyvaluePair = {};
      newKeyvaluePair[key] = updaterObj[key];
      propertiesNotUpdatedArray.push(newKeyvaluePair);
    }
  }
  return {updatedObject,propertiesNotUpdatedArray};
}

//tested--
function addPropertyToObject(targetObject, propertiesArray){
  var targetObjectClone = Object.assign({},targetObject);

  for(let a=0; a < propertiesArray.length; a++){
    for(let key in propertiesArray[a]){
        let value = propertiesArray[a][key];

        targetObjectClone[key] = value;
    }
  }
  return targetObjectClone;
}


const Utils = {
  isValidJson : isValidJson,
  jsonSafeParse : jsonSafeParse,
  isValid : isValid,
  inputIsString : inputIsString,
  inputIsNumber : inputIsNumber,
  inputIsObject:inputIsObject,
  updateTargetObject:updateTargetObject,
  updateObjectProperty:updateObjectProperty,
  addPropertyToObject:addPropertyToObject
}

  

 export default Utils;