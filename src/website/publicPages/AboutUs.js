import React from 'react';
import NavigationFooter from '../home/footer/NavigationFooter';
import ButtonGoHome from '../common/ButtonGoHome.js';

export default function AboutUs(){

  
    return(<div className="about-us">
                <div className="about-us-background"></div>
                <div className="about-us-container">
                    <div className="about-us-page">
                        <ButtonGoHome/>
                        <div><NavigationFooter/></div> 
                        <br/><br/><br/>
                        <div className="about-us-page-content">
                            <h2>ABOUT US</h2>

                            <p>We are an Australian based online jewellery store.
                            Our website houses an impeccable blend of iconic designs.
                            Excellent customer service is the secret to our success
                            and you can have confidence that the highest standards of service
                            and integrity will be maintained in our dealings with you.</p>

                            <p>From this website you can see our gorgeous variety, create a wish list,
                            and shop for numerous styles creating a unique personal statement for you.
                            All our orders will ship within 24 -48 hours (subject to availability).
                            </p>
                            <p>
                            If you have a question, please don’t hesitate to ask via the Contact Us page.
                            </p>
                            <p>
                            We hope you enjoy our wonderful products.
                            </p>
                        </div>
                    </div>
                </div>
            </div>)
      
}