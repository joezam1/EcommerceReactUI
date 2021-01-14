import React from 'react';
import ReactDOM from 'react-dom';

import AboutUs from '../website/publicPages/AboutUs.js';
import PrivacyPolicy from '../website/publicPages/PrivacyPolicy.js';
import Security from '../website/publicPages/Security.js'; 
import ShippingsAndReturns from '../website/publicPages/ShippingsAndReturns.js';
import TermsAndConditions from '../website/publicPages/TermsAndConditions.js';


function FactoryCreatePagePromise(selectedPageName){
    var promise = new Promise(function(resolve, reject){
        try{
            
            var pageWindow = document.getElementById('page');
            switch(selectedPageName){
                case 'about-us':
                    ReactDOM.render(<div><AboutUs/></div>, pageWindow);
                    
                    break;
                case 'privacy-policy':
                    ReactDOM.render(<div><PrivacyPolicy/></div>,pageWindow);

                    break;
                case 'security':
                    ReactDOM.render(<div><Security/></div>,pageWindow);   

                    break;
                case 'shippings-and-returns':
                    ReactDOM.render(<div><ShippingsAndReturns/></div>,pageWindow);

                    break;
                case 'terms-and-conditions':
                    ReactDOM.render(<div><TermsAndConditions/></div>,pageWindow);

                    break;
                default:
                    resolve(false);
                    break;
            }
            resolve(true);
        }catch(err)
        {
            var errorInfo = new Error(err);
            reject(errorInfo);
        }
    });
    return promise;
}

function setStylePagePromise(targetClassName,stylesObj){
    var promise = new Promise(function(resolve, reject){
        try{
            //Utils.setSizeHtmlElementByClassName(targetClassName);
            var windowDisplay = document.getElementsByClassName(targetClassName);
            for(var property in stylesObj){
                windowDisplay[0].style[property] = stylesObj[property];
            }
            resolve(true)
        }catch(err)
        {
            var errorInfo = new Error(err);
            reject(errorInfo);
        }
    });
    return promise;
}

var PageFactory={
    FactoryCreatePagePromise:FactoryCreatePagePromise,
    setStylePagePromise: setStylePagePromise
}

export default PageFactory