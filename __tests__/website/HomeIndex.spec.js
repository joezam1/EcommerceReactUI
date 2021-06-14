import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import HomeIndex from '../../src/website/home/HomeIndex.js';

xdescribe('File HomeIndex', function(){
    afterEach(cleanup);
    test('Create a snapshot', function(){
        let container = render(<HomeIndex/>);

        expect(container.asFragment(<HomeIndex/>)).toMatchSnapshot();

    })
})
