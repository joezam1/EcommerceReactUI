import React from 'react';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import PrivacyPolicy from '../../src/website/publicPages/PrivacyPolicy';

xdescribe('file PrivacyPolicy', function(){
    afterEach(cleanup);
    test('create a snapshot', function(){
        let container = render(<PrivacyPolicy/>);
        expect(container.asFragment(<PrivacyPolicy/>)).toMatchSnapshot();
    })
})
