
import React from 'react';
import ReactDOM from 'react-dom';

import SingleProductModal from '../website/modals/SingleProductModal.js';


function FactoryCreaateModalPromise(modalName){
    var promise = new Promise(function(resolve, reject){
        try{
            var modalWindow = document.getElementById('modal');
            switch(modalName){
                case 'single-product-modal':
                    ReactDOM.render(<div><SingleProductModal/></div>, modalWindow);
                    resolve('modal-display-ok');
                    break;
        
                default:
                    resolve('modal-display-ok');
                    break;

            }
            
        }catch(err)
        {
            var errorInfo = new Error(err);
            reject(errorInfo);
        }
    });
    return promise;
}

var ModalFactory ={
    FactoryCreaateModalPromise : FactoryCreaateModalPromise
}

export default ModalFactory;
