import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import ButtonGoHome from '../../src/website/common/ButtonGoHome.js';
import ReactRenderHelper from '../../src/library/ReactRenderHelper.js';



xdescribe('File ButtonGoHome', function(){
    afterEach(cleanup);
    test('button onClick triggers event', function(){
        //arrange 
        ReactRenderHelper.goHomePage = jest.fn();
        //act
        let container = render(<ButtonGoHome/>);
        let buttonObj = container.getByTestId('button-go-home-id');
        fireEvent.click(buttonObj);
        //assert
        expect(ReactRenderHelper.goHomePage).toHaveBeenCalledTimes(1);
    })
})