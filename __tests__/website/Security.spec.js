import React from 'react';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import Security from '../../src/website/publicPages/Security.js';

describe('file Security', function(){
    afterEach(cleanup);
    test('create a snapshot', function(){
        let container = render(<Security/>);
        expect(container.asFragment(<Security/>)).toMatchSnapshot();
    })
})
