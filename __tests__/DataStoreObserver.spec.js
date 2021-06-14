import DataStoreObserver from '../src/dataStore/DataStoreObserver.js';


xdescribe('function DataStoreObserver', function(){

    test('get dataStoreProperty ', function(){
        //arrange
        var property = 'statusesOnDisplay';
        var resultArray = ['New Arrival','Hot offers', 'On Discount'];
        DataStoreObserver.setDataStoreProperty(property, resultArray);
        //act
        var result = DataStoreObserver.getDataStoreProperty(property);

        //assert
        expect(result).toBe(resultArray);
    });

    test('watchReducerAction updates dataStore value', function(){
        //arrange
        var property = 'productsOnDisplay';
        var prodA = {id:1, description: 'prod A'}
        var prodB = {id:2, description: 'prod B'}
        var products = [prodA, prodB];
        DataStoreObserver.setDataStoreProperty(property,products);
        //act
        var prodC = {id:3, description: 'prod C'}
        var prodD = {id:4, description: 'prod D'}
        var prodE = {id:5, description: 'prod E'}
        var dataStore = {
            productsOnDisplay : [prodC, prodD, prodE]
        }

        var result = DataStoreObserver.watchReducerAction(dataStore);
        //assert
        var itemsCount = result.productsOnDisplay.length; 
        expect(itemsCount).toBe(3);

    });

    test('addObserversToList adds 2 callbacks', function(){

        //arrange
        var callback1 = jest.fn();
        var callback2 = jest.fn();
        //act
        var result = DataStoreObserver.addObserverToList('callback1', callback1);
        var result1 = DataStoreObserver.addObserverToList('callback2', callback2);
        var observers = DataStoreObserver.getAllObservers();
        var totalObservers = observers.length;
        //assert
        
        expect(totalObservers).toBe(result1);
    });

    test('notifyallObservers sends notification to 2 callbacks',function(){
        //arrange
        var callback1 = jest.fn();
        var callback2 = jest.fn();
        DataStoreObserver.addObserverToList('callback1', callback1);
        DataStoreObserver.addObserverToList('callback2', callback2);
        var dataStoreObj = DataStoreObserver.getDataStore();
        //act        
        var result = DataStoreObserver.notifyAllObservers(dataStoreObj);
        //assert
        expect(result).toBe(2);

    } );

});