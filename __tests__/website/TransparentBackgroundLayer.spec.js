import React from 'react';

import {render, cleanup, waitFor, fireEvent} from '@testing-library/react';

import TransparentBackgroundLayer from '../../src/website/layers/TransparentBackgroundLayer.js';

xdescribe('File TransparentBackgroundLayer', function(){
    afterEach(cleanup);
    test('create a snapshot', function(){
        let container = render(<TransparentBackgroundLayer/>);
        expect(container.asFragment(<TransparentBackgroundLayer/>)).toMatchSnapshot();

    })
})