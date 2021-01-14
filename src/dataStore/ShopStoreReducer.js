
import Utils from '../library/Utils.js';
import DataStoreInvoker from './DataStoreInvoker.js';

var baseProducts = [];

const dataStore = {
    productsOnDisplay:[],
    categoriesOnDisplay:[],
    statusesOnDisplay:[],
    activeStatusId: -1,
    activeCategoryId:-1,
    singleProduct: {}
}

const shopReducer = function(componentState, action){
    var cloneState = Object.assign({}, componentState)
    var cloneState1 = {...componentState}; 
    try
    {
        switch(action.type)
        {
            case "SET_INITIAL_STATE":
                baseProducts = action.payload.products;
                dataStore.categoriesOnDisplay = action.payload.categories;
                dataStore.statusesOnDisplay = action.payload.statuses;
                dataStore.activeStatusId = action.payload.statusId;

                DataStoreInvoker.watchReducerUpdate(dataStore); 
                return
            
            case "ADD_PRODUCTS":
                var newProductsArray = action.payload;
                baseProducts.push.apply(baseProducts, newProductsArray);
                DataStoreInvoker.watchReducerUpdate(dataStore);

            return baseProducts;

            case "FILTER_PRODUCTS":
                var categoryIdPayload = action.payload.categoryId;
                var statusIdPayload = action.payload.statusId;

                var selectedCategoryId = (Utils.isValid(categoryIdPayload)) ? categoryIdPayload: dataStore.activeCategoryId;
                var selectedStatusId = (Utils.isValid(statusIdPayload)) ? statusIdPayload: dataStore.activeStatusId;
                var selectedProducts = getSelectedProducts(baseProducts,  selectedCategoryId, selectedStatusId);
                dataStore.productsOnDisplay = selectedProducts;
                dataStore.activeCategoryId = selectedCategoryId;
                dataStore.activeStatusId = selectedStatusId;
                DataStoreInvoker.watchReducerUpdate(dataStore);

            return selectedProducts;

            case 'SET_ACTIVE_STATUS':
                dataStore.activeStatusId = Utils.inputIsNumber(action.payload) ? action.payload :  dataStore.activeStatusId;
                DataStoreInvoker.watchReducerUpdate(dataStore);

            return dataStore.activeStatusId;

            case 'SET_ACTIVE_CATEGORY':
                dataStore.activeCategoryId = Utils.inputIsNumber(action.payload) ? action.payload : dataStore.activeCategoryId;
                DataStoreInvoker.watchReducerUpdate(dataStore);

            return dataStore.activeCategoryId;

            case 'SET_SINGLE_PRODUCT':
                var selectedProduct = action.payload
                dataStore.singleProduct = selectedProduct;
                DataStoreInvoker.watchReducerUpdate(dataStore);
            return selectedProduct;
            
            default:
                return componentState;;
        }
    }
    catch(error)
    {
        throw new Error("ShopstateReducer Error:", error);
    }
}


const shopReducerInfo = {
    shopReducer : shopReducer
}
export default shopReducerInfo;




//#region Private Methods

function getSelectedProducts(productsArray, selectedCategoryId, selectedStatusId)
{
    var selectedProducts = [];

    if(selectedStatusId === -1 && selectedCategoryId === -1){
        //return all products
        selectedProducts = JSON.parse(JSON.stringify(productsArray));
    }

    else if(selectedStatusId !== -1 && selectedCategoryId === -1){
        //return all products filtered by Status
        function productFilterCallback(product){
            var result = (product.StatusId === selectedStatusId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    else if(selectedStatusId === -1 && selectedCategoryId !== -1){
        //return all products filtered by Category
        function productFilterCallback(product){
            var result = (product.CategoryId === selectedCategoryId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    else if(selectedStatusId !== -1 && selectedCategoryId !== -1){
        //return all products filtered by Category and Status
        function productFilterCallback(product){
            var result = (product.CategoryId === selectedCategoryId && product.StatusId === selectedStatusId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    return selectedProducts;
}


//#endregion Private Methods