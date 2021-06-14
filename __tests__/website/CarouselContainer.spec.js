import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';


import CarouselContainer from '../../src/website/home/CarouselContainer.js';
import CarouselSlider from '../../src/jsFeatures/carousel/CarouselSlider.js';


xdescribe("File CarouselContainer", function(){
    afterAll(cleanup);
    test('Arrow left is triggered on click', function(){
        CarouselSlider.setButtonLeft = jest.fn();
        let container = render(<CarouselContainer/>);
        let btnArrowLeft = container.getByTestId('slideToLeft');
        fireEvent.click(btnArrowLeft);
        expect(CarouselSlider.setButtonLeft).toBeCalledTimes(1);

    })
    test('Arrow right is triggered on click', function(){
        CarouselSlider.setButtonRight = jest.fn();
        let container = render(<CarouselContainer/>);        
        let btnArrowRight = container.getByTestId('slideToRight')
        fireEvent.click(btnArrowRight);
        expect(CarouselSlider.setButtonRight).toBeCalledTimes(1);

    })
});