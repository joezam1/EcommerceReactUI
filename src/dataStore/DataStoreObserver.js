import Utils from '../library/Utils.js';


var dataStore= {
    productsOnDisplay:[],
    categoriesOnDisplay:[],
    statusesOnDisplay:[],
    activeStatusId: -1,
    activeCategoryId:-1,
    singleProduct: {}
}

var observersCallbackArray = [];

function getDataStore(){
    return dataStore;
}

//test not required
function setDataStoreProperty(property, value){
    for(var key in dataStore){
      if(key === property){
        dataStore[key] = value;
      }
    }
}

//tested--
function getDataStoreProperty(property){
    var dataStorePropertyValue = dataStore[property];
    return dataStorePropertyValue;
}

//test not required
function getAllObservers(){
  return observersCallbackArray;
}

//tested--
function watchReducerAction(dataStoreObj){
    var dataStoreClone = Object.assign({},dataStore);
    
    var updatedObj = Utils.updateTargetObject(dataStoreClone,dataStoreObj);
    notifyAllObservers(updatedObj);
    dataStore = updatedObj;
    return updatedObj;
}


//tested--
var counter = 1;
function addObserverToList(sectionName,callbackFunction){

  console.log('DataStoreObserver-addObserverToList-addCallback:',counter);
  console.log('DataStoreObserver-addObserverToList-sectionName:',sectionName);
  counter++;
    var callbackObj = {sectionName: sectionName, call:callbackFunction}
    const found = observersCallbackArray.find(element => element.sectionName === callbackObj.sectionName);
    if(found === null || found === undefined){
      observersCallbackArray.push(callbackObj);
    }
    console.log('MYSTORE-addObserverToList-zllObservers:',observersCallbackArray);
    return observersCallbackArray.length;
}

//test
function notifyAllObservers(updatedStore){
  console.log('notifyAllObservers-observersCallbackArray',observersCallbackArray);
  for(var a =0; a< observersCallbackArray.length; a++){
    observersCallbackArray[a].call(updatedStore);
  }
  return observersCallbackArray.length;
}


var service = {
    setDataStoreProperty:setDataStoreProperty,
    watchReducerAction:watchReducerAction,
    addObserverToList:addObserverToList,
    notifyAllObservers:notifyAllObservers,
    getDataStore:getDataStore,
    getDataStoreProperty:getDataStoreProperty,
    getAllObservers:getAllObservers
}

  export default service;