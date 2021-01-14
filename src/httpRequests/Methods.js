import Utils from '../library/Utils.js';

const authHeaders = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:3080',
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    'Content-Type' : 'application/json',
    'Accept': 'application/json'
}) 

const options={
    method:'GET',
    headers: authHeaders
}

var getMethod = function(url, responseCallback){
    fetch(url,options)
    .then(function(response){
        var responseClone = response.clone();
        if(response.ok)
        {
            var clonedJson = responseClone.json();
            return response.text();
        }
        else{
            return new Error(response);
        }
    })
    .then(function(result){
        var jsonParsedResponse = '';
        var isJsonObj = Utils.isValidJson(result);
        var isTypeString = Utils.inputIsString(result);
        var data = null
        if(isJsonObj && isTypeString)
        {
            jsonParsedResponse = Utils.jsonSafeParse(result);
            //we cam re-parse the json object to remove all quotes
            var objIsStr = Utils.inputIsString(jsonParsedResponse);
            const jsonObj = JSON.parse(jsonParsedResponse);
            var data = (objIsStr)? jsonObj : jsonParsedResponse;
            
        }
       return data;
    })
    .then(function(dataJsonObj){
        responseCallback(dataJsonObj);
    })
    .catch(function(err){
        throw new Error(err);
    })
}

const httpMethod = {
    getMethod: getMethod
}

export default httpMethod;