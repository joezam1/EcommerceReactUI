import Utils from '../library/Utils.js';

var storeUpdateWatcher = {
    initialState:0,
    updatedState:0
}

var dataStoreClone={};

var callbackFunctionsRegister = [
    {
        callbackFunctionName:'productsCallback',
        executed:false
    },
    {
        callbackFunctionName:'categoryCallback',
        executed:false
    },
    {
        callbackFunctionName:'statusCallback',
        executed:false
    },
    {
        callbackFunctionName:'statusCallback1',
        executed:false
    }

]

function watchReducerUpdate(dataStoreObj){
    dataStoreClone = Object.assign({},dataStoreObj);

    storeUpdateWatcher.updatedState +=1;

    for(var c =0; c< callbackFunctionsRegister.length; c++){
        callbackFunctionsRegister[c].executed = false;
    }

}

const intervalInMilliseconds = 500;
const notifyDataStoreState = function(property, callbackName, propertyCallback){

    setInterval(function(){ 
        //code goes here that will be run every 5 seconds.
        if(storeUpdateWatcher.initialState < storeUpdateWatcher.updatedState){
            if(Utils.isValid(propertyCallback)){
                propertyCallback(dataStoreClone[property]);
            }

            var allCallbacksExecuted = isCallbackRegisterExecuted(callbackName);
            if(allCallbacksExecuted){
                storeUpdateWatcher.initialState = storeUpdateWatcher.updatedState;
                if(storeUpdateWatcher.initialState ==50){
                    storeUpdateWatcher.initialState = 0;
                    storeUpdateWatcher.updatedState = 0;
                }
            }
        }
    }, intervalInMilliseconds);
    return dataStoreClone[property];
}

const getDataStoreState = function(property){
   var dataStorePropertyValue = dataStoreClone[property];
   return dataStorePropertyValue;
} 


const invoker = {
    watchReducerUpdate:watchReducerUpdate,
    notifyDataStoreState : notifyDataStoreState,
    getDataStoreState : getDataStoreState
}

export default invoker;

//#region Private Methods

function isCallbackRegisterExecuted(callbackName){
    var totalCallbacks = callbackFunctionsRegister.length
    for(var a = 0; a<totalCallbacks; a++)
    {
        if(callbackFunctionsRegister[a].callbackFunctionName === callbackName)
        {
            callbackFunctionsRegister[a].executed = true;
        }
    }

    var result = countCallbackFunctionsExecuted();
    var allExecuted = (result === totalCallbacks)? true: false;
    return allExecuted;
}

function countCallbackFunctionsExecuted(){
    var counter = 0;
    for(var a = 0; a<callbackFunctionsRegister.length; a++)
    {
        if(callbackFunctionsRegister[a].executed == true)
        {
            counter++;
        }
    }
    return counter;
}
//#endregion Private Methods