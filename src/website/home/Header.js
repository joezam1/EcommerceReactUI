import React from 'react';
import CarouselContainer from './CarouselContainer.js';
import NavigationBar from './NavigationBar.js'
import CustomerSection from './CustomerSection.js'

export default function Header(){
    return (
        <div className="header-section"> 
            <CarouselContainer/>
            <NavigationBar/>
            <CustomerSection/>
        </div>
    )
}