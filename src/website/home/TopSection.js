import React,{useState, useReducer, useEffect} from 'react';
import Utils from '../../library/Utils.js'
import DataStoreInvoker from '../../dataStore/DataStoreInvoker.js';
import ShopStoreReducer from '../../dataStore/ShopStoreReducer.js';
import Carousel from '../../jsFeatures/Carousel.js';//'../../jsfeatures/Carousel.js';

export default function TopSection(){
    const [filteredProducts , dispatch] = useReducer(ShopStoreReducer.shopReducer);
    const [activeStatuses, setStatusesStateAsync] = useState();

    const fadeInClassName = 'fadeIn';
    const fadeOutClassName = 'fadeOut';
    const MediumDeviceWidth = 768; 
    const abortController = new AbortController();
    var mounted = false;

    function cleanup(){
       
        abortController.abort();
    }

    useEffect(function(){
        mounted = true;
        console.log('MidSection-productsCallback-triggered')
        Carousel.runCarousel();
        return cleanup();
    },[]);


    window.addEventListener('resize',function(){

        var size = Utils.getBrowserCurrentSize();
        if(size.width > MediumDeviceWidth){
            var mobileButton = document.getElementById('navbar-mobile-id');
            mobileButton.classList.remove(fadeInClassName);
            mobileButton.classList.remove(fadeOutClassName)
        }
    })

    function toggleMobileButton(){
        var mobileButton = document.getElementById('navbar-mobile-id');
        var classFound = mobileButton.classList.contains(fadeInClassName);
       
        if(!classFound){
            mobileButton.classList.add(fadeInClassName);
            mobileButton.classList.remove(fadeOutClassName);
        }else{
            mobileButton.classList.add(fadeOutClassName);
            mobileButton.classList.remove(fadeInClassName);
        }
    }


    function getSelectedProductStatus(event){
        
        var defaultStatusId = -1
        var activeStatusId = DataStoreInvoker.getDataStoreState('activeStatusId');
        var currentStatusId  = (typeof(activeStatusId) === 'number') ? activeStatusId: defaultStatusId;
        var id = parseInt(event.target.id);
        event.stopPropagation();
        if(id===currentStatusId){
            var filter = {
                statusId: defaultStatusId
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            Utils.removeClassNameFromClassList('navbar-button','status-active')
        }
        else if(id !==currentStatusId){
            var filter = {
                statusId: id
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            Utils.addClassNameToClassListById(id,'navbar-button','status-active');
        }     
    }

    function setSliderDirection(event){
        event.stopPropagation();
        var id = event.target.id;
        
        Carousel.setCarouselDirection(id);
    }
   
    function statusCallback(allActiveStatuses){
        if(mounted){
            setStatusesStateAsync(allActiveStatuses);
        }
    }

    DataStoreInvoker.notifyDataStoreState('statusesOnDisplay','statusCallback', statusCallback);
    
    var statuses =(activeStatuses!== undefined) ?
                    activeStatuses.map((item)=>{
                       return <li key={item.StatusId} id={item.StatusId} className={'navbar-li'}> 
                                  <button type="button" 
                                          className="navbar-button bton" 
                                          id={item.StatusId} 
                                          onClick={getSelectedProductStatus} 
                                          >{item.Name} 
                                   </button>
                              </li>;
                    }) :"Not Loaded";

    return (<div className="top-section">
                <div className="canvas">

                <section className="hero-slider">
                    <div className="hero-carousel"></div>
                    <div id="slideToLeft" className="chevron-left" onClick={setSliderDirection}></div>
                    <div id="slideToRight" className="chevron-right" onClick={setSliderDirection}></div>
                </section>

                </div>
                <div className="navbar-container">
                    <div className="logo">
                        <img src='./assets/logo/alisa_logo.png' className="logo-image" alt="alisaJewellery"/>
                    </div>
                    <ul id="navbar-mobile-id" className= "navbar">
                        {statuses}
                        <li className="navbar-li-access-area"><button type="button" className="navbar-button bton">Login</button></li>
                        <li className="navbar-li-access-area"> <button type="button" className="navbar-button bton">Register</button></li>
                    </ul>
                    <div className="navbar-mobile-button" onClick={toggleMobileButton}>
                            <div className="navbar-mobile-line"></div>
                            <div className="navbar-mobile-line"></div>
                            <div className="navbar-mobile-line"></div>
                    </div>
                </div>
            </div>
    )
} 