import React from 'react';
import {render, cleanup,fireEvent, waitFor} from '@testing-library/react';

import NavigationFooter from '../../src/website/home/footer/NavigationFooter.js';
import ReactRenderHelper from '../../src/library/ReactRenderHelper.js';

xdescribe('File NavigationFooter.js', function(){
    afterEach(cleanup);
    test('Page "Home" is triggered on click', function(){
        
        //arrange
        ReactRenderHelper.goHomePage = jest.fn();
        let container = render(<NavigationFooter />);        
        //act
        let buttonGoHome = container.getByTestId('home');
        fireEvent.click(buttonGoHome);
        //assert
        expect(ReactRenderHelper.goHomePage).toHaveBeenCalledTimes(1);
    });

    test('Page "About Us" is triggered on click', function(){
        
        //arrange
        ReactRenderHelper.displaySelectedPage = jest.fn();
        let container = render(<NavigationFooter />);        
        //act
        let buttonAboutUs = container.getByTestId('about-us');
        fireEvent.click(buttonAboutUs);
        //assert
        expect(ReactRenderHelper.displaySelectedPage).toHaveBeenCalledTimes(1);
    });
});