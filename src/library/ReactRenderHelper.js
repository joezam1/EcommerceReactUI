import OverlayFactory from './OverlayFactory.js';
import ModalFactory from './ModalFactory.js';
import PageFactory from './PageFactory';
import Utils from './Utils.js';


var displaySelectedPage = function(pageName){
    var styleHomeIndex = {
        display:'none'
    }
    var targetClass = 'home-index';
    PageFactory.setStylePagePromise(targetClass, styleHomeIndex);

    Utils.addEventListenerForWindowResizeParams(pageName);
    
    PageFactory.FactoryCreatePagePromise(pageName)
    .then(function(resultSuccess){
        if(resultSuccess){
            Utils.setSizeHtmlElementByClassName(pageName);
            var styles = {
                display:'block',
                position:'absolute'
            }
            return PageFactory.setStylePagePromise(pageName, styles);
        }       
    })
    .catch(function(err){
        throw new Error(err);
    })
}

var goHomePage = function(){
    var styleHomeIndex ={
        display:''
    }
    var targetClass = 'home-index';
    PageFactory.setStylePagePromise(targetClass, styleHomeIndex);
    Utils.unmountComponentPromise('page')
    .catch(function(error){
        throw new Error(error);
    })
}

var displaySelectedModal = function(modalName){
    var backgroundLayerClass = 'transparent-layer';
    
    Utils.addEventListenerForWindowResizeParams(backgroundLayerClass);
    OverlayFactory.FactoryCreateBackgroundLayerPromise('overlay',backgroundLayerClass,'black')
    .then(function(result){
        return OverlayFactory.setStyleBackgroundLayerPromise(result.class,result.color);
    })
    .then(function(result){
        return ModalFactory.FactoryCreaateModalPromise(modalName);
    })
    .catch(function(err){
        throw new Error(err);
    });
    
}

var closeSelectedModal = function(){//modalName){
    var backgroundLayerClass = 'transparent-layer';
    Utils.removeEventListenerForWindowResizeParams(backgroundLayerClass);
    Utils.unmountComponentPromise('modal')
    .then(function(result){
        return Utils.unmountComponentPromise('overlay');
    })
    .catch(function(error){
        throw new Error(error);
    })
}


const renderHelper ={
    displaySelectedModal : displaySelectedModal,
    closeSelectedModal : closeSelectedModal,
    displaySelectedPage:displaySelectedPage,
    goHomePage:goHomePage
}

export default renderHelper;



//#region Private Methods


//#endregion Private Methods