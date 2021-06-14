import Methods from '../src/httpRequests/Methods.js';


xdescribe('File Methods', function(){
    test('Mock fetch function called ', function(){
        //Arrange
        const mockSuccessResponse = jest.fn();
        const mockJsonPromise = function (){
            return new Promise(function(resolve, reject){
                mockSuccessResponse();
                resolve('ok');
            })
        }
        const mockFetchPromise = function(){
            return new Promise(function(resolve, reject){
                mockJsonPromise();
                resolve('ok');
            })
        };
              
        Methods.getMethod = jest.fn(function(){
            mockFetchPromise();
        })
        //act
        Methods.getMethod();
      
        //assert
        expect(mockSuccessResponse).toHaveBeenCalledTimes(1);
    })
});