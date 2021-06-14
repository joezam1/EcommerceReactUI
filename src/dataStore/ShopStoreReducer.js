
import Utils from '../library/Utils.js';
import DataStoreObserver from './DataStoreObserver.js';

var baseProducts = [];

var initialDataStore ={}

const shopReducer = function(componentState, action){
    var dataStore = Object.assign({}, initialDataStore)
    try
    {
        switch(action.type)
        {
            case "SET_INITIAL_STATE":
                baseProducts = action.payload.products;
                dataStore.categoriesOnDisplay = action.payload.categories;
                dataStore.statusesOnDisplay = action.payload.statuses;
                dataStore.activeStatusId = action.payload.statusId;
                break;
            
            case "ADD_PRODUCTS":
                var newProductsArray = action.payload;
                baseProducts.push.apply(baseProducts, newProductsArray);
                break;

            case "FILTER_PRODUCTS":
                let categoryIdPayload = action.payload.categoryId;
                let statusIdPayload = action.payload.statusId;
                let updatedDataStore = DataStoreObserver.getDataStore();
                let selectedCategoryId = (Utils.isValid(categoryIdPayload)) ? categoryIdPayload: updatedDataStore.activeCategoryId;
                let selectedStatusId = (Utils.isValid(statusIdPayload)) ? statusIdPayload: updatedDataStore.activeStatusId;
                let selectedProducts = getSelectedProducts(baseProducts,  selectedCategoryId, selectedStatusId);
                dataStore.productsOnDisplay = selectedProducts;
                dataStore.activeCategoryId = selectedCategoryId;
                dataStore.activeStatusId = selectedStatusId;
                break;

            case 'SET_ACTIVE_STATUS':
                let updatedStatusId = DataStoreObserver.getDataStoreProperty('activeStatusId');
                dataStore.activeStatusId = Utils.inputIsNumber(action.payload) ? action.payload :  updatedStatusId;
                break;

            case 'SET_ACTIVE_CATEGORY':
                let updatedCategoryId = DataStoreObserver.getDataStoreProperty('activeCategoryId');
                dataStore.activeCategoryId = Utils.inputIsNumber(action.payload) ? action.payload : updatedCategoryId;
                break;

            case 'SET_SINGLE_PRODUCT':
                var selectedProduct = action.payload
                dataStore.singleProduct = selectedProduct;
                break;
            
            default:
                break;
        }

        DataStoreObserver.watchReducerAction(dataStore);
        return dataStore;

    }
    catch(error)
    {
        console.log('ShopStoreReducer-shopReducer error:', error);
        throw new Error("ShopStoreReducer Error:", error);
    }
}


function getSelectedProducts(productsArray, selectedCategoryId, selectedStatusId)
{
    var selectedProducts = [];

     //return all products
    if(selectedStatusId === -1 && selectedCategoryId === -1){       
        selectedProducts = JSON.parse(JSON.stringify(productsArray));
    }

    //return all products filtered by Status
    else if(selectedStatusId !== -1 && selectedCategoryId === -1){        
        function productFilterCallback(product){
            var result = (product.StatusId === selectedStatusId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    //return all products filtered by Category
    else if(selectedStatusId === -1 && selectedCategoryId !== -1){        
        function productFilterCallback(product){
            var result = (product.CategoryId === selectedCategoryId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    //return all products filtered by Category and Status
    else if(selectedStatusId !== -1 && selectedCategoryId !== -1){        
        function productFilterCallback(product){
            var result = (product.CategoryId === selectedCategoryId && product.StatusId === selectedStatusId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    return selectedProducts;
}

const shopReducerInfo = {
    shopReducer : shopReducer,
    getSelectedProducts : getSelectedProducts
}
export default shopReducerInfo;


