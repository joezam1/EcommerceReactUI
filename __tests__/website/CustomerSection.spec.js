import React from 'react';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import CustomerSection from '../../src/website/home/CustomerSection.js';

xdescribe('File CustomerSection', function(){
    afterEach(cleanup);
    test('take a snapshot', function(){
        let container = render(<CustomerSection/>);
        expect(container.asFragment(<CustomerSection/>)).toMatchSnapshot();
    })
})