import ReactDOM from 'react-dom';



var addEventListenerForWindowResizeParams = function(selectedClassName) {
  window.addEventListener("resize", function(){
      setSizeHtmlElementByClassName(selectedClassName);
  });
}


var removeEventListenerForWindowResizeParams = function(selectedClassName) {
  window.removeEventListener("resize", function(){
      setSizeHtmlElementByClassName(selectedClassName);
  });
}


var setSizeHtmlElementByClassName = function(selectedClassName){
  var windowDisplay = document.getElementsByClassName(selectedClassName);
  var slidingBarMargin = 20;
  var currentSize = getBrowserCurrentSize();
  if(windowDisplay.length>0 && windowDisplay != undefined){
    windowDisplay[0].style.height = ""+currentSize.height+"px";
    windowDisplay[0].style.width = ""+(currentSize.width-slidingBarMargin)+"px";
  }
}


var getBrowserCurrentSize = function(){
    var size = {
        width: (window.innerWidth > document.body.clientWidth)? window.innerWidth : document.body.clientWidth,
        height: (window.innerHeight > document.body.clientHeight)? window.innerHeight : document.body.clientHeight
    }
    return size;
}


var isValidJson = function(stringValue){

    try{
        var result = JSON.parse(stringValue);
    }catch(ex){
        console.log(ex);
        return false;
    }
    return true;
}


var jsonSafeParse = function(stringValue){

    var result = "";
    try{
        result = JSON.parse(stringValue);
    }catch(ex){
        console.log(ex);
    }
    return result;
}


var isValid = function(selectedInput){
    if(selectedInput !=null && selectedInput !== undefined)
    {
        return true;
    }
    return false;
}

var inputIsString = function(selectedInput){
   var isTypeString = (typeof selectedInput === 'string');
   return isTypeString;
}

var inputIsNumber = function(selectedInput){
    if(!isNaN(selectedInput) && typeof selectedInput === 'number' ){
        return true;
    }
    return false;
}


var addClassNameToClassListById = function(id, targetClass, className){
  var classList = document.getElementsByClassName(targetClass);
  if(classList.length>0){
    for(var a= 0; a < classList.length; a++){
      var classListId = parseInt(classList[a].id);
      if(classListId===id){
        classList[a].classList.add(className)
      }else{
        classList[a].classList.remove(className)
      }
    }
  }
}
  

var removeClassNameFromClassList = function(targetClass, className){
  var classList = document.getElementsByClassName(targetClass);
  if(classList != undefined && classList.length>0){
    for(var a=0; a<classList.length;a++){
        classList[a].classList.remove(className);
    }
  }
}
  

var unmountComponentPromise = function(parentHtmlElementId){
    var promise = new Promise(function(resolve, reject){
        try{
            var elementId = document.getElementById(parentHtmlElementId)
            ReactDOM.unmountComponentAtNode(elementId);
            resolve('component-unmounted-ok')
        }catch(err)
        {
            var errorInfo = new Error(err);
            reject(errorInfo);
        }
    });
    return promise;  
}


const Utils = {
  addEventListenerForWindowResizeParams : addEventListenerForWindowResizeParams,
  removeEventListenerForWindowResizeParams:removeEventListenerForWindowResizeParams,
  setSizeHtmlElementByClassName:setSizeHtmlElementByClassName,
  getBrowserCurrentSize : getBrowserCurrentSize,
  isValidJson : isValidJson,
  jsonSafeParse : jsonSafeParse,
  isValid : isValid,
  inputIsString : inputIsString,
  inputIsNumber : inputIsNumber,
  addClassNameToClassListById : addClassNameToClassListById,
  removeClassNameFromClassList : removeClassNameFromClassList,
  unmountComponentPromise : unmountComponentPromise
  
}

  

 export default Utils;