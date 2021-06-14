import OverlayCreator from './OverlayCreator.js';
import ModalFactory from './ModalFactory.js';
import PageFactory from './PageFactory';
import ReactUtils from './ReactUtils.js';
import DomUtils from './DomUtils.js';

//tested--
var displaySelectedPage = function(pageName){
    var styleHomeIndex = {
        display:'none'
    }
    var targetClass = 'home-index';
    PageFactory.setStylePagePromise(targetClass, styleHomeIndex);

    DomUtils.addEventListenerForWindowResizeParams(pageName);
    
    PageFactory.FactoryCreatePagePromise(pageName)
    .then(function(resultSuccess){
        if(resultSuccess){
            DomUtils.dynamicHtmlElementResize(pageName);
            var styles = {
                display:'block',
                position:'absolute'
            }
            return PageFactory.setStylePagePromise(pageName, styles);
        }
        return 'failed';       
    })
    .catch(function(err){
        throw new Error(err);
    })
}

//tested--
var goHomePage = function(){
    var styleHomeIndex ={
        display:''
    }
    var targetClass = 'home-index';
    PageFactory.setStylePagePromise(targetClass, styleHomeIndex);
    ReactUtils.unmountComponentPromise('page');
}

//tested--
var displaySelectedModal = function(modalName){
    var backgroundLayerClass = 'transparent-layer';
    
    DomUtils.addEventListenerForWindowResizeParams(backgroundLayerClass);
    OverlayCreator.FactoryCreateBackgroundLayerPromise('overlay',backgroundLayerClass,'black')
    .then(function(result){
        return OverlayCreator.setStyleBackgroundLayerPromise(result.class,result.color);
    })
    .then(function(result){
        return ModalFactory.FactoryCreateModalPromise(modalName);
    })
    .catch(function(err){
        throw new Error(err);
    });   
}

//tested--
var closeSelectedModal = function(modalName){
    var backgroundLayerClass = 'transparent-layer';
    DomUtils.removeEventListenerForWindowResizeParams(backgroundLayerClass);
    ReactUtils.unmountComponentPromise(modalName)
    .then(function(result){
        return ReactUtils.unmountComponentPromise('overlay');
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