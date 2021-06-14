import React from 'react';
import {render, cleanup, screen} from '@testing-library/react';
import App from '../src/App.js';



xdescribe('File: App.js',function(){
    afterEach(cleanup);
    test('true is true',function(){
        expect(true).toBe(true);
    })

    test('It should take a snapshot', function(){
        var container = render(<App/>);
        expect(container.asFragment(<App/>)).toMatchSnapshot();
    })
})