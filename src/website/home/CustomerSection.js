import React from 'react';


export default function CustomerSection(){
    return (<div className="customer-section">
              <input type="textbox" className="search-textbox"/>
              <button type="button" className="search-button">Find</button>
              <div className="contact-email">contact@flowershop.com</div>

              <div className="cart-info">CART: 0</div>
          
              <ul className="access-area-ul">
                  <li className="access-area-li"><button type="button" className="login bton">Login</button> </li>
                  <li className="access-area-li"><button type="button" className="register bton">Register</button></li>
              </ul>
            </div>
    )
}