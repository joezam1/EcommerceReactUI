import ReactDOM from 'react-dom';


var unmountComponentPromise = function(parentHtmlElementId){
    var promise = new Promise(function(resolve, reject){
        try{
            var elementId = document.getElementById(parentHtmlElementId)
            ReactDOM.unmountComponentAtNode(elementId);
            resolve('component-unmounted-ok')
        }catch(err)
        {
            var errorInfo = new Error(err);
            reject(errorInfo);
        }
    });
    return promise;  
}

const ReactUtils = {
    unmountComponentPromise
}

export default ReactUtils;