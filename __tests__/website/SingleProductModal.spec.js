import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import SingleProductModal from '../../src/website/modals/SingleProductModal.js';

xdescribe('File SingleProductModal', function(){
    test('take a snapshot', function(){
        let container = render(<SingleProductModal/>);
        expect(container.asFragment(<SingleProductModal/>)).toMatchSnapshot();
    })
})