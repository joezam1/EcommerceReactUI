import React, {useState, useReducer} from 'react';
import ShopStoreReducer from '../../dataStore/ShopStoreReducer.js';
import DataStoreObserver from '../../dataStore/DataStoreObserver.js';
import DomUtils from '../../library/DomUtils.js'

export default function NavigationBar(){

    const [filteredProducts , dispatch] = useReducer(ShopStoreReducer.shopReducer);
    const [activeStatuses, setStatusesState] = useState();
        
    const fadeInClassName = 'fadeIn';
    const fadeOutClassName = 'fadeOut';
    const MediumDeviceWidth = 768; 


    function getSelectedProductStatus(event){
        
        var defaultStatusId = -1
        var activeStatusId = DataStoreObserver.getDataStoreProperty('activeStatusId');
        var currentStatusId  = (typeof(activeStatusId) === 'number') ? activeStatusId: defaultStatusId;
        var id = parseInt(event.target.id);
        event.stopPropagation();
        if(id===currentStatusId){
            var filter = {
                statusId: defaultStatusId
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            DomUtils.removeClassNameFromClassList('navbar-button','status-active')
        }
        else if(id !==currentStatusId){
            var filter = {
                statusId: id
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            DomUtils.addClassNameToClassListById(id,'navbar-button','status-active');
        }     
    }

    window.addEventListener('resize',function(){

        var size = DomUtils.getBrowserCurrentSize();
        if(size.width > MediumDeviceWidth){
            var mobileButton = document.getElementById('navbar-mobile-id');
            mobileButton.classList.remove(fadeInClassName);
            mobileButton.classList.remove(fadeOutClassName)
        }
    })

    function toggleMobileButton(){
        var mobileButton = document.getElementById('navbar-mobile-id');
        var classFound = mobileButton.classList.contains(fadeInClassName);
        (!classFound) 
            ? DomUtils.setElementAddRemoveClasses(mobileButton,fadeInClassName, fadeOutClassName)
            : DomUtils.setElementAddRemoveClasses(mobileButton,fadeOutClassName, fadeInClassName);
    }

    function statusCallback(updatedDataStore){
        var allActiveStatuses = updatedDataStore.statusesOnDisplay;
        setTimeout(function(){
            console.log('setStatusesState-allActiveStatuses',allActiveStatuses)
            setStatusesState(allActiveStatuses);
        },1);       
    }


    DataStoreObserver.addObserverToList('navigationBar-status',statusCallback);

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
    return(
        <div className="navbar-container">
            <div className="logo">
                <img src='./assets/logo/alisa_logo.png' className="logo-image" alt="alisaJewellery"/>
            </div>
            <ul id="navbar-mobile-id" className= "navbar">
            {statuses}
                <li className="navbar-li-access-area"><button type="button" className="navbar-button bton">Login</button></li>
                <li className="navbar-li-access-area"> <button type="button" className="navbar-button bton">Register</button></li>
            </ul>
            <div className="navbar-mobile-button" data-testid="navbar-mobile-button-id" onClick={toggleMobileButton}>
                    <div className="navbar-mobile-line"></div>
                    <div className="navbar-mobile-line"></div>
                    <div className="navbar-mobile-line"></div>
            </div>
        </div>
    ) 

}