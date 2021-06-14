//import React from 'react';
//import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
//import "core-js/stable";
import "regenerator-runtime/runtime";

import ModalFactory from '../src/library/ModalFactory.js';


xdescribe('File ModalFactory.js', function(){
    test('function called async',async function(){
        //arrange
        let divModal = document.createElement('DIV');
        divModal.id = 'modal';
        document.body.appendChild(divModal);
        //act
        let reactModalObj = await ModalFactory.FactoryCreateModalPromise('single-product-modal');
        let resultSuccess = 'modal-display-ok';
        //assert
        expect(reactModalObj).toBe(resultSuccess);

    });
});