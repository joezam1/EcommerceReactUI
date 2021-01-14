import React from 'react';
import ReactRenderHelper from '../../library/ReactRenderHelper.js';



export default function ButtonGoHome(){
    function goBackHomePage(){
        ReactRenderHelper.goHomePage();
    }
    return (<div className="button-go-home">
        <span className="button-go-home-text" onClick={goBackHomePage}>&times;
        </span>
    </div>);
}