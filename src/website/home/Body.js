import React, {useState, useReducer, useEffect} from 'react';
import DataStoreInvoker from '../../dataStore/DataStoreInvoker.js';
import ShopStoreReducer from '../../dataStore/ShopStoreReducer.js';
import ReactRenderHelper from '../../library/ReactRenderHelper.js';
import Utils from '../../library/Utils.js';

export default function Body(){
    const [filteredProducts, dispatch] = useReducer(ShopStoreReducer.shopReducer);
    const [singleProduct, dispatch1] = useReducer(ShopStoreReducer.shopReducer);
    const [selectedProducts, setProductsStateAsync] = useState();
    const [activeCategories, setCategoriesStateAsync] = useState();
    const [activeStatuses , setStatusesStateAsync] = useState();


    //var abortController = new AbortController();
    // function cleanup(){
    //     abortController.abort();
    // }

    // useEffect(function(){
    //     return cleanup();
    // },[]);

    function displaySingleProduct(event){
        var id = parseInt(event.target.id);
        var singleProduct = getSelectedProduct(id);
        event.stopPropagation();
        dispatch1({type: 'SET_SINGLE_PRODUCT', payload:singleProduct});
        ReactRenderHelper.displaySelectedModal('single-product-modal');
    }

    function getSelectedProduct(id){
        for(var a =0; a<selectedProducts.length; a++){
            if(selectedProducts[a].ProductId ===id){
                return selectedProducts[a];
            }
        }
        return null;
    }

    function getSelectedStatusName(id){
         var statuses =(Utils.isValid(activeStatuses)) ? activeStatuses : [];
        for(var a=0; a<statuses.length; a++){
          if(statuses[a].StatusId===id){
            return statuses[a].Name;
          }
        }
        return '';
    }

    function getSelectedCategory(event){
        var defaultCategoryId = -1
        var activeCategoryId = DataStoreInvoker.getDataStoreState('activeCategoryId');
        var currentCategoryId  = (typeof(activeCategoryId) === 'number') ? activeCategoryId : defaultCategoryId;
        var id = parseInt(event.target.id);
        event.stopPropagation();
        if(id===currentCategoryId){
            var filter = {
                categoryId: defaultCategoryId
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            Utils.removeClassNameFromClassList('product-category-button','status-active')
        }
        else if(id !==currentCategoryId){
            var filter = {
                categoryId: id
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            Utils.addClassNameToClassListById(id,'product-category-button','status-active');
        }
    }

    function displayAllProducts(){
        var defaultCategoryId = -1;
        var defaultStatusId = -1;
        var filter = {
            categoryId: defaultCategoryId,
            statusId: defaultStatusId
        }
        dispatch({type: 'FILTER_PRODUCTS', payload:filter});
        Utils.removeClassNameFromClassList('navbar-button','status-active')
        Utils.removeClassNameFromClassList('product-category-button','status-active')
       
    }

    function productsCallback(products){
            setProductsStateAsync(products);
    }

    function categoriesCallback(categories){
            setCategoriesStateAsync(categories); 
    }

    function statusesCallback(statuses){
            setStatusesStateAsync(statuses);
    }

    DataStoreInvoker.notifyDataStoreState('categoriesOnDisplay','categoryCallback', categoriesCallback);
    DataStoreInvoker.notifyDataStoreState('statusesOnDisplay','statusCallback1', statusesCallback);
    DataStoreInvoker.notifyDataStoreState('productsOnDisplay','productsCallback', productsCallback);
    
    var categories = (activeCategories !== undefined) ?
                     activeCategories.map((item)=>{
                     return <li key={item.CategoryId} id ={item.CategoryId} className="category-li"> 
                                 <button type = "button" 
                                         id = {item.CategoryId}
                                         className = "product-category-button bton"
                                         onClick = {getSelectedCategory}
                                         >{item.Name}
                                 </button>
                            </li>;
                  }) :"Not Loaded";


    var productsLoaded = (selectedProducts !== undefined) ?
                        selectedProducts.map((item)=>{
                        return  <div key={item.ProductId} className="card" id={item.ProductId}>
                                    <div className="button-buy-now">Buy Now</div>
                                    <div className="product-container" id={item.ProductId} onClick={displaySingleProduct}>
                                        <div className="price-container" id={item.ProductId} onClick={displaySingleProduct}></div>
                                        <h3 className="product-price" id={item.ProductId} item={item}> ${item.Price} </h3>
                                        <img src={'./assets/products/' + item.ImageHref1} id={item.ProductId} className="product-image"/>
                                        <div className="category-text-container" id={item.ProductId} onClick={displaySingleProduct}></div>
                                        <span className='category-text' id={item.ProductId}> {getSelectedStatusName(item.StatusId)}</span>
                                    </div>
                                </div>
                    }) : "Not loaded";
                   

    return(<div className="body-section">
        <ul className="categories-container">
            {categories}
            <div className="category-item category-li">
                <button type = "button" 
                        id = "button-all-products-id"
                        className = "product-category-button bton"
                        onClick={displayAllProducts}
                        > Show All
                </button>
            </div>
        </ul>

        <div className="store-container">
            <div className="store-products-container">
            {productsLoaded}
            </div>
        </div>
    </div>)
}