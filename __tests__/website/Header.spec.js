import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import Header from '../../src/website/home/Header.js';

xdescribe('File Header', function(){
    afterEach(cleanup);
    test("Create a snapshot", function(){
        let container = render(<Header/>);

        expect(container.asFragment(<Header/>)).toMatchSnapshot();
    })
})