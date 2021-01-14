import React from 'react';
import TopSection from './TopSection.js';
import CustomerSection from './CustomerSection.js'

export default function Header(){
    return (
        <div className="header-section"> 
            <TopSection/>
            <CustomerSection/>
        </div>
    )
}
