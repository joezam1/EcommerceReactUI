import React from 'react';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import TermsAndConditions from '../../src/website/publicPages/TermsAndConditions.js';

xdescribe('file TermsAndConditions', function(){
    afterEach(cleanup);
    test('create a snapshot', function(){
        let container = render(<TermsAndConditions/>);
        expect(container.asFragment(<TermsAndConditions/>)).toMatchSnapshot();
    })
})
