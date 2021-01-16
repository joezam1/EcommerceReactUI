import React ,{useEffect, useReducer} from 'react';
import Header from './Header.js';
import Body from './Body.js';
import FooterIndex from './footer/FooterIndex.js';

import Methods from '../../httpRequests/Methods.js';
import jsonDataFile from '../../../dataJson/shopData.json';
import ShopStoreReducer from '../../dataStore/ShopStoreReducer.js';




export default function HomeIndex(){
    const abortController = new AbortController();
           
  
    const url = 'http://localhost:5000/api/shop/all-components';
    //NOTE: For Development need to go to Chrome and select
    //chrome://flags/
    // Then search for : certificates and 
    //enable Allow invalid certificates for resources loaded from localhost.
    const url1 = 'https://localhost:5001/api/shop/all-components';

    const [stateShopComponents, dispatch] = useReducer(ShopStoreReducer.shopReducer);//, ShopStoreReducer.dataStore);
    const [stateProducts, dispatch1] = useReducer(ShopStoreReducer.shopReducer);
   
    function homeBodyResponseCallback(parsedResponse){
    
        var initialProducts = parsedResponse.products;
            var initialCategories = parsedResponse.categories;
            var initialStatuses = parsedResponse.statuses;
        const initialPayload = {
            products:initialProducts,
            categories:initialCategories,
            statuses: initialStatuses,
            statusId:-1
        }

        dispatch({type:'SET_INITIAL_STATE', payload:initialPayload});

        const defaultFilter= {
            statusId : -1
        }
        dispatch1({type:'FILTER_PRODUCTS', payload:defaultFilter});
    }

    function mockResponseCallback(){
        console.log("------------mock API request BEGIN----------");
        console.log(jsonDataFile);
        var initialProducts = jsonDataFile.products;
        var initialCategories = jsonDataFile.categories;
        var initialStatuses = jsonDataFile.statuses;
        console.log("------------mock API request END----------");
        console.log('all products: ', initialProducts);
        console.log('shopDataStore:', ShopStoreReducer.dataStore);

        const initialPayload = {
            products:initialProducts,
            categories:initialCategories,
            statuses: initialStatuses,
            statusId:-1
        }
        dispatch({type:'SET_INITIAL_STATE', payload:initialPayload});

        const defaultFilter= {
            statusId : -1
        }
        dispatch1({type:'FILTER_PRODUCTS', payload:defaultFilter});
        
    }

    function cleanupFetch(){
        abortController.abort();
    }
    useEffect(function(){
        mockResponseCallback();
        //Methods.getMethod(url, homeBodyResponseCallback );
        //return cleanupFetch();
    },[]);

    return(<div className="home-index">
            <Header/>
            <Body/>
            <FooterIndex/>
        </div>)
}