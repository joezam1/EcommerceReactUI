import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import FooterIndex from '../../src/website/home/footer/FooterIndex.js';


xdescribe('File FooterINdex.spec.js', function(){
    afterEach(cleanup);
    test('it should take a snapshot', function(){
        const container = render(<FooterIndex/>);
        expect(container.asFragment(<FooterIndex/>)).toMatchSnapshot();
    });
})