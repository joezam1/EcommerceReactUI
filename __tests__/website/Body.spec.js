import React from 'react';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import Body from '../../src/website/home/Body.js';
import DomUtils from '../../src/library/DomUtils.js';



xdescribe('File Body.js', function(){
    afterEach(cleanup);
    test('function selectCategory is triggered onClick', function(){
        //arrange
        let container = render(<Body/>);
        let btnAllProducts = container.getByTestId("button-all-products-testid");
        DomUtils.removeClassNameFromClassList = jest.fn();
        //act
        fireEvent.click(btnAllProducts);
        //assert
        expect(DomUtils.removeClassNameFromClassList).toBeCalledTimes(2);
    })
})