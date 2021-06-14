import React from 'react';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import AboutUs from '../../src/website/publicPages/AboutUs.js';

xdescribe('file AboutUs', function(){
    afterEach(cleanup);
    test('create a snapshot', function(){
        let container = render(<AboutUs/>);
        expect(container.asFragment(<AboutUs/>)).toMatchSnapshot();
    })
})
