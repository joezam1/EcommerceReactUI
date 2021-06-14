import React from 'react';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import ShippingsAndReturns from '../../src/website/publicPages/ShippingsAndReturns';

xdescribe('file ShippingsAndReturns', function(){
    afterEach(cleanup);
    test('create a snapshot', function(){
        let container = render(<ShippingsAndReturns/>);
        expect(container.asFragment(<ShippingsAndReturns/>)).toMatchSnapshot();
    })
})
