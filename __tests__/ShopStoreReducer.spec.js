import ShopStoreReducer from '../src/dataStore/ShopStoreReducer.js';
import DataStoreObserver from '../src/dataStore/DataStoreObserver.js';


xdescribe('file ShopStoreReducer', function(){
    test('reducer action - set Initial State to 3 categories', function(){
        //arrange
        let prodA = {id:1, description:'product A'};
        let prodB = {id:2, description:'product B'};
        let prodC = {id:3, description:'product C'};

        let categRings = {categoryId:1, name: 'rings'};
        let categPendants = {categoryId:2, name:'pendants'};
        let categNecklaces = {categoryId:3, nane: 'necklaces'};

        let statusNewArrival = {statusId:1, name:'New Arrivals'};
        let statusHotOffers = {statusId:2, name:'Hot Offers'};
        let statusOnSale = {statusId:3, name:'On Sale'};
        let action = {
            type:'SET_INITIAL_STATE',
            payload:{
                products:[prodA, prodB, prodC],
                categories:[categRings, categPendants, categNecklaces],
                statuses:[statusNewArrival, statusHotOffers, statusOnSale],
                statusId:-1
            }
        }
        //act
        DataStoreObserver.watchReducerAction = jest.fn();
        let dataStore = ShopStoreReducer.shopReducer(null,action);
        let categories = dataStore.categoriesOnDisplay;
        let categoriesCount = categories.length;
        //assert
        expect(categoriesCount).toBe(3);

    });

    test('getSelectedProducts by Category and Status', function(){
        //arrange
        let prodA = {Id:1, Description:'product A', StatusId:1, CategoryId:1};
        let prodB = {Id:2, Description:'product B', StatusId:1, CategoryId:1};
        let prodC = {Id:3, Description:'product C', StatusId:2, CategoryId:1};
        let prodD = {Id:4, Description:'product D', StatusId:3, CategoryId:2};
        let prodE = {Id:5, Description:'product E', StatusId:4, CategoryId:2};
        let allProducts = [prodA, prodB, prodC, prodD, prodE];
        //act
        var productsCase1 = ShopStoreReducer.getSelectedProducts(allProducts, -1, -1);
        var productsCase2 = ShopStoreReducer.getSelectedProducts(allProducts, 1, -1);
        var productsCase3 = ShopStoreReducer.getSelectedProducts(allProducts, -1, 3);
        var productsCase4 = ShopStoreReducer.getSelectedProducts(allProducts, 2, 4);
        //assert
        expect(productsCase1.length).toBe(5);
        expect(productsCase2.length).toBe(3);
        expect(productsCase3.length).toBe(1);
        expect(productsCase4.length).toBe(1);


    })
});