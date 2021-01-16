import React from 'react';
import NavigationFooter from './NavigationFooter.js';

export default function FooterIndex(){
    return(<div className="footer-section">
                <NavigationFooter/>
                <div className="footer-bottom-section">
                   <div className="footer-container-ul">
                        <div className="footer-item-li">
                            <div>
                                <ul className="footer-newsletter-ul">
                                    <li className="footer-newsletter-li">
                                        <span>Subscribe to our newsletter</span>
                                    </li>
                                    <li className="footer-newsletter-li">
                                        <input type="text" name="customer-email" className="newsletter-input" placeholder="your email here"/>
                                        <button type="button" className="newsletter-button" >Subscribe</button>
                                    </li>
                                </ul>
                                <li className="footer-content-li"><br/></li>
                                <li className="footer-content-li"><br/></li>
                                <span className="footer-title">Follow Us</span>
                                <ul className="footer-content-icons-ul">
                                    <li className="footer-content-li"> </li>    
                                   
                                    <li className="footer-content-li"><br/></li>
                                    <li className="footer-content-li">
                                        <img src="./assets/socialMedia/twitter_Logo_WhiteOnBlue.png" alt="twitter" className="twitter-icon"/>
                                    </li>                                    
                                    <li className="footer-content-li">
                                    <div className="facebook-icon-container">
                                        <img src="./assets/socialMedia/facebook-124010.png" alt="facebook" className="facebook-icon"/>
                                    </div>
                                      
                                    </li>
                                    <li className="footer-content-li">
                                        <img src="./assets/socialMedia/instagram-logo.png" alt="instagram" className="instagram-icon"/>
                                    </li>
                                    <li className="footer-content-li"></li>
                                </ul>
                               

                                <br/>                              
                            </div>
                        </div>      
                        <div className="footer-item-li">
                            <div>
                                <ul className="footer-content-ul">
                                    <li className="footer-content-li">
                                        <span className="footer-title">Company</span>
                                    </li>    
                                   
                                    <li className="footer-content-li"><br/></li>
                                    <li className="footer-content-li">About Us</li>                                    
                                    <li className="footer-content-li">Company History</li>
                                    <li className="footer-content-li">Location</li>
                                    <li className="footer-content-li">International Shipping FAQ</li>
                                    <li className="footer-content-li">Our Stores</li>
                                    <li className="footer-content-li">Unsubscribe to Newsletter</li>

                                </ul>
                            </div>
                        </div>
                        <div className="footer-item-li">
                           <div>
                                <ul className="footer-content-ul">
                                    <li className="footer-company-li">
                                        <span className="footer-title">Customer</span>
                                    </li>                                       
                                    <li className="footer-content-li"><br/></li>

                                    <li className="footer-content-li">My Account</li>                                    
                                    <li className="footer-content-li">Contact Us</li>
                                    <li className="footer-content-li">Our Services</li>
                                    <li className="footer-content-li">FAQs</li>
                                </ul>
                           </div>
                        </div>
                        <li className="footer-item-li">
                            <div>
                                <ul className="footer-content-ul">
                                    <li className="footer-content-li">
                                        <span className="footer-title">Our Blog</span>
                                    </li>    
                                    <li className="footer-content-li"><br/></li>

                                    <li className="footer-content-li">Articles</li>                                    
                                    <li className="footer-content-li">News</li>
                                    <li className="footer-content-li">Videos</li>
                                    <li className="footer-content-li"></li>
                                </ul>

                            </div>
                        </li>                      
                     </div>
                </div>
                
           </div>)
}