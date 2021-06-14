import React from 'react';
import ReactRenderHelper from '../../../library/ReactRenderHelper.js';


export default function NavigationFooter(){

    function goBackHomePage(){
        ReactRenderHelper.goHomePage();
    }

    function displayWebPage(event){
        var pageName = event.target.id;
        ReactRenderHelper.displaySelectedPage(pageName)
    }

    
    return(<div className="navigation-footer">
                <div className="footer-elements-ul">
                    <div className="footer-element-li" id="home" data-testid="home" onClick={goBackHomePage}>Home</div> 
                    <div className="footer-element-li" id='about-us' data-testid='about-us' onClick={displayWebPage}>About Us</div>
                    <div className="footer-element-li" id="terms-and-conditions" onClick={displayWebPage}>Terms & Conditions</div> 
                    <div className="footer-element-li" id='shippings-and-returns' onClick={displayWebPage}>Shippings & Returns</div> 
                    <div className="footer-element-li" id="privacy-policy" onClick={displayWebPage} >Privacy Policy</div> 
                    <div className="footer-element-li" id="security" onClick={displayWebPage}>Security</div>                     
                </div>
            </div>)

}