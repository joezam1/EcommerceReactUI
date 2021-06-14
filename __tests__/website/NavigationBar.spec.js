import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';

import NavigationBar from '../../src/website/home/NavigationBar.js';
import DomUtils from '../../src/library/DomUtils.js';

describe('File NavigationBar', function(){
    afterEach(cleanup);
    test('toggle mobile button on click', function(){
        let div = document.createElement('DIV');
        div.id = 'navbar-mobile-id';
        document.body.appendChild(div);
        DomUtils.setElementAddRemoveClasses = jest.fn();
        let container = render(<NavigationBar/>);
        let btnToggle = container.getByTestId('navbar-mobile-button-id');
        fireEvent.click(btnToggle);

        expect(DomUtils.setElementAddRemoveClasses).toHaveBeenCalledTimes(1);

    })
})