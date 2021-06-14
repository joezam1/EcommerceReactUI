//var CarouselHelper = require('../src/helper.js');
import CarouselHelper from '../src/jsFeatures/carousel/CarouselHelper.js';


xdescribe('testing jest works ok. file: helper.js',function(){
    test('True-is-True',function(){
        expect(true).toEqual(true);
    });
});

xdescribe('Test on CarouselHelper.js', function(){
    
    describe('function getDirectionFactor', function(){
       test('left input equals -1',function(){
            let input = 'left';
            let result = CarouselHelper.getDirectionFactor(input);
            expect(result).toEqual(-1);
       });

       test('any input other than left equals 1',function(){
            let input = 'LeFT';
            let result = CarouselHelper.getDirectionFactor(input);
         expect(result).toEqual(1);
        }); 
    });

    describe('function getNextElementCurrentPositionLeftByDirection', function(){
        test('On direction: left - image Left position equals offsetLeft + clientWidth',function(){
            //arrange
            let image1Current = new Object();
            image1Current.clientWidth = 100;
            image1Current.offsetLeft = 50
            
            let image2Next = new Object();
            //image2Next.clientWidth = 150;
            //image2Next.offsetLeft = 10;
            let directionL = 'left';

            //act
            var result1 = CarouselHelper.getNextElementCurrentPositionLeftByDirection(image1Current,image2Next,directionL);
            //assert
            expect(result1).toEqual(image1Current.offsetLeft + image1Current.clientWidth);
        });
        test('On direction: right -Next image Left position equals img1.offsetLeft - img2.clientWidth',function(){
            //arrange
            let image1Current = new Object();
            image1Current.clientWidth = 100;
            image1Current.offsetLeft = 50
            
            let image2Next = new Object();
            image2Next.clientWidth = 150;
            image2Next.offsetLeft = 10;
            let directionR = 'right'
            //act
            var result2 = CarouselHelper.getNextElementCurrentPositionLeftByDirection(image1Current,image2Next,directionR);
            //assert
            expect(result2).toEqual(image1Current.offsetLeft - image2Next.clientWidth);
        });
    });

    describe('function getNextElementInitialPositionLeftByDirection', function(){
        test('On direction: left - Image Next Initial Position equals img1.offsetLeft + img1.clientWidth', function(){
            //arrange
            let image1Current = new Object();
            image1Current.clientWidth = 100;
            image1Current.offsetLeft = 50
            
            let image2Next = new Object();
            let directionL = 'left';
             //act
             var result1 = CarouselHelper.getNextElementInitialPositionLeftByDirection(image1Current,image2Next,directionL);
             //assert
             expect(result1).toEqual(image1Current.offsetLeft + image1Current.clientWidth);
        });
        test('On direction: right - Image Next Initial Position equals img1.offsetLeft - img2.clientWidth', function(){
            //arrange
            let image1Current = new Object();
            image1Current.clientWidth = 100;
            image1Current.offsetLeft = 50
            
            let image2Next = new Object();
            image2Next.clientWidth = 150;
            image2Next.offsetLeft = 10;
            let directionR = 'right';
             //act
             var result1 = CarouselHelper.getNextElementInitialPositionLeftByDirection(image1Current,image2Next,directionR);
             //assert
             expect(result1).toEqual(image1Current.offsetLeft - image2Next.clientWidth);
        });
    });

    describe('function getWindowWidthByDirection', function(){
        test('Direction left - width width is negative', function(){
            let directionL = 'left';
            let windowWidth = window.innerWidth;
            let result = CarouselHelper.getWindowWidthByDirection(directionL);
            expect(result).toEqual(-windowWidth);
        });

        test('Direction right - width width is positive', function(){
            let directionR = 'right';
            let windowWidth = window.innerWidth;
            let result = CarouselHelper.getWindowWidthByDirection(directionR);
            expect(result).toEqual(windowWidth);
        });
    });

    describe('function getNextArrayElementIndexByDirection',function(){
        test('direction left next Index is 1 value less than current index', function(){
            let direction = 'left';
            let currentIndex = 4;
            let totalArrayElementsCount = 6;
            let result = CarouselHelper.getNextArrayElementIndexByDirection(direction, currentIndex, totalArrayElementsCount);
            expect(result).toEqual(5);
        });
        test('direction right next Index is 1 value more than current index', function(){
            let direction = 'right';
            let currentIndex = 4;
            let totalArrayElementsCount = 6;
            let result = CarouselHelper.getNextArrayElementIndexByDirection(direction, currentIndex, totalArrayElementsCount);
            expect(result).toEqual(3);
        });
    });

    describe('function insertImagesInTargetElement',function(){
        test('insert Images in element', function(){
            //arrange
                let divContainer = document.createElement('DIV');
                let imagesArray  = [
                    './src/assets/images/ringpixel-bee-6XjrarDC97U-unsplash.jpg',
                    './src/assets/images/diamond-1186139_1920.jpg'];

            //act
                let result = CarouselHelper.insertImagesInTargetElement(divContainer, imagesArray);
                let count = result.childNodes.length;
            //assert
            expect(count).toEqual(2);
        });
    });

    describe('function getNextArrayElementByDirection', function(){
        test('direction left - next Element is following Item', function(){
            //arrange
            let img1 = document.createElement('IMG');
            img1.className = 'display';

            let img2 = document.createElement('IMG');
            img2.className = 'hide';

            let img3 = document.createElement('IMG');
            img3.className = 'displayNext';

            let imgArray = [img1,img2,img3];
            let direction = 'left';
            //act
            let result = CarouselHelper.getNextArrayElementByDirection(direction,'display',imgArray);
            //assert
            expect(result.className).toEqual('hide');
        });

        test('direction right - next Element is prefious Item', function(){
            //arrange
            let img1 = document.createElement('IMG');
            img1.className = 'display';

            let img2 = document.createElement('IMG');
            img2.className = 'hide';

            let img3 = document.createElement('IMG');
            img3.className = 'displayNext';

            let imgArray = [img1,img2,img3];
            let direction = 'right';
            //act
            let result = CarouselHelper.getNextArrayElementByDirection(direction,'display',imgArray);
            //assert
            expect(result.className).toEqual('displayNext');
        })
    });

    describe('function hasCurrentElementReachedEndingPosition', function(){
        test('direction left - current element has not reached Ending Position',function(){
            //arrange 
            let windowClientWidth = window.innerWidth;
            let img1 = new Object();
            img1.offsetLeft = (windowClientWidth - 50);
            let direction = 'left';
            //act
            let result = CarouselHelper.hasCurrentElementReachedEndingPosition(direction,img1);
            //assert
            expect(result).toEqual(false);
        });
        test('direction left - current element is beyond Ending Position',function(){
            //arrange 
            let windowClientWidth = window.innerWidth;
            let img1 = new Object();
            img1.className = 'target';
            img1.style = new Object();
            img1.style.position = "absolute";
            img1.style.left =''+  ((windowClientWidth + 50) * -1) +'px';
            img1.offsetLeft =  ((windowClientWidth + 50) * -1);
            let direction = 'left';
            //act
            let result = CarouselHelper.hasCurrentElementReachedEndingPosition(direction,img1);
            //assert
            expect(result).toEqual(true);
        });

    });

    describe('function hasNextElementReachedEndingPosition', function(){
        test('direction left - element has not reached ending Position', function(){
            //arrange
            let direction = 'left';
            let endingPosition = (window.innerWidth * -1);
            let img1 = new Object();
            img1.offsetLeft = 50;
            //act
            let result = CarouselHelper.hasNextElementReachedEndingPosition(direction,img1,endingPosition);
            //assert
            expect(result).toEqual(false);

        });
        test('direction left - element is beyond ending Position', function(){
            //arrange
            let direction = 'left';

            let endingPosition = (window.innerWidth * -1);
            let img1 = new Object();
            img1.offsetLeft = endingPosition - 50;
            //act
            let result = CarouselHelper.hasNextElementReachedEndingPosition(direction,img1,endingPosition);
            //assert
            expect(result).toEqual(true);

        });
    });
    
})


