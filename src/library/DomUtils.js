
import Utils from '../library/Utils.js';

    var addEventListenerForWindowResizeParams = function(selectedClassName) {
        window.addEventListener("resize", function(){
            dynamicHtmlElementResize(selectedClassName);
        });
    }

    var removeEventListenerForWindowResizeParams = function(selectedClassName) {
        window.removeEventListener("resize", function(){
            dynamicHtmlElementResize(selectedClassName);
        });
    }
  
    var dynamicHtmlElementResize = function(selectedClassName){
        var slidingBarMargin = 20;
        var currentSize = getBrowserCurrentSize();
        setSizeHtmlElementByClassName(selectedClassName, currentSize, slidingBarMargin);
    }
  
    //tested--
    var setSizeHtmlElementByClassName = function(selectedClassName, currentSize, slidingBarMargin){
        var windowDisplay = document.getElementsByClassName(selectedClassName);             
        if(windowDisplay.length>0 && windowDisplay != undefined){
            windowDisplay[0].style.height = ""+currentSize.height+"px";
            windowDisplay[0].style.width = ""+(currentSize.width-slidingBarMargin)+"px";
        }
    }

    //tested--
    var getBrowserCurrentSize = function(){
        var size = {
            width: (window.innerWidth > document.body.clientWidth)? window.innerWidth : document.body.clientWidth,
            height: (window.innerHeight > document.body.clientHeight)? window.innerHeight : document.body.clientHeight
        }
        return size;
    }

    //tested--
    function setElementAddRemoveClasses(htmlElement, classToAdd,classToRemove){
        if(Utils.isValid(classToAdd)){
            htmlElement.classList.add(classToAdd);
        }

        if(Utils.isValid(classToRemove)){
            htmlElement.classList.remove(classToRemove);
        }
    }

    //tested--
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

    //tested--
    var removeClassNameFromClassList = function(targetClass, classNameForRemoval){
        var classList = document.getElementsByClassName(targetClass);
        if(classList != undefined && classList.length>0){
            for(var a=0; a<classList.length;a++){
                classList[a].classList.remove(classNameForRemoval);
            }
        }
    }

  const DomUtils ={
    addEventListenerForWindowResizeParams,
    removeEventListenerForWindowResizeParams,
    getBrowserCurrentSize,
    dynamicHtmlElementResize,
    setSizeHtmlElementByClassName,
    addClassNameToClassListById,
    removeClassNameFromClassList,
    setElementAddRemoveClasses
  }

  export default DomUtils