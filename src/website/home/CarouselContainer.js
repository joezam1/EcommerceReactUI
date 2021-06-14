import React, {useState, useReducer, useEffect} from 'react';
import CarouselSlider from '../../jsFeatures/carousel/CarouselSlider.js';

export default function CarouselContainer(){

    const abortController = new AbortController();

    function cleanup(){       
        abortController.abort();
    }

    useEffect(function(){
        console.log('CarouselContainer-useEffect-triggered')
        CarouselSlider.init();
        CarouselSlider.carouselStart();
        return cleanup();
    },[]);

    function setSliderDirection(event){
        event.stopPropagation();
        var id = event.target.id;
        switch(id){
            case 'slideToLeft':
                CarouselSlider.setButtonLeft();
                break;
            case 'slideToRight':
                CarouselSlider.setButtonRight();
                break;
    
            default:
                break;
        }
        
    }
    
    return (
        <div className="carousel-container">
            <div className="canvas">
            <section id="hero-slider-id" className="hero-carousel-container">
                <div id='hero-carousel-id' className="hero-carousel"></div>
                <div id="slideToLeft" data-testid="slideToLeft" className="chevron-left" onClick={setSliderDirection}></div>
                <div id="slideToRight" data-testid="slideToRight" className="chevron-right" onClick={setSliderDirection}></div>
            </section>
            </div>                
        </div>
    )
}