import React from 'react';
import ReactDOM from 'react-dom';
import TransparentBackgroundLayer from '../website/layers/TransparentBackgroundLayer.js';
import Utils from './Utils.js';
import DomUtils from './DomUtils.js';

//tested--
function FactoryCreateBackgroundLayerPromise(targetNodeId, className, backgroundColor){

    var promise = new Promise(function(resolve, reject){
        try{
            var backgroundWindow = document.getElementById(targetNodeId);
            ReactDOM.render(<div><TransparentBackgroundLayer/></div>, backgroundWindow);
            var layerSettings = {
                class:className,
                color:backgroundColor,
            }
            resolve(layerSettings)
        }catch(err)
        {
            var errorInfo = new Error(err);
            reject(errorInfo);
        }
    });
    return promise;
}

//tested--
function setStyleBackgroundLayerPromise(className,backgroundColor){
    var promise = new Promise(function(resolve, reject){
        try
        {
            DomUtils.dynamicHtmlElementResize(className);
            var windowDisplay = document.getElementsByClassName(className);
            windowDisplay[0].style.display = 'block';
            windowDisplay[0].style.background = backgroundColor;
            resolve('backgroundLayer-display-ok')
        }catch(err)
        {
            var errorInfo = new Error(err);
            reject(errorInfo);
        }
    });
    return promise;
}



var OverlayCreator = {
    FactoryCreateBackgroundLayerPromise : FactoryCreateBackgroundLayerPromise,
    setStyleBackgroundLayerPromise : setStyleBackgroundLayerPromise
}

export default OverlayCreator