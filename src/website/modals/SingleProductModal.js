import React,{useEffect, useState} from 'react';
import DataStoreObserver from '../../dataStore/DataStoreObserver.js';
import Utils from '../../library/Utils.js';
import ReactRenderHelper from '../../library/ReactRenderHelper.js';


export default function SingleProductModal(){
    
    const abortController = new AbortController();
    const [item, setSingleProductAsync] = useState();

    var mounted = false;
    function cleanup(){
        mounted = false;
        abortController.abort();
    }
    

    useEffect(function(){
       mounted = true;

        var selectedProduct = DataStoreObserver.getDataStoreProperty('singleProduct');
        
        setSingleProductAsync(selectedProduct);
             
       return cleanup();
    },[]);
   
    function closeSingleProductWindow(){ 
        let modalName = 'modal';
        ReactRenderHelper.closeSelectedModal(modalName);
    }
    var itemIsValid = Utils.isValid(item);
    var displayProduct = (itemIsValid)? "single-product-display":"single-product-hide";

    var product = (itemIsValid)? (
            <div key={item.ProductId} className={"single-product-card " +displayProduct} id={item.ProductId}>
            <div className="single-product-buy-button">Buy Now</div>
            <div className="single-product-container" id={item.ProductId} >
                <span id={item.ProductId} className="single-product-price-item">$ {item.Price}</span>
                <img src={'./assets/products/' + item.ImageHref1} id={item.ProductId} className="single-product-image"/>
                <span id={item.ProductId} className="single-product-name">{item.Name}</span>
                <span id={item.ProductId} data-sku={item.SKU} className="single-product-sku"></span>
                <span id={item.ProductId} data-serial-number={item.SerialNumber}className="single-product-serial-number"></span>
                <span id={item.ProductId} className="single-product-description">{item.Description}</span>
                <div className="back-to-store-button" onClick={closeSingleProductWindow}> Back To Store</div>

            </div>
            </div>
    ) : "";
    return(<div className="single-product-modal">
        {product}
        </div>)
}