import CarouselHelper from '../src/jsFeatures/carousel/CarouselHelper.js';
import CarouselSlider from '../src/jsFeatures/carousel/CarouselSlider.js';






xdescribe('test jest works ok. file:carousel.spec.js', function(){
    test('true-is-true',function(){
        expect(true).toEqual(true);
    });

    describe('function getAllImageFileLocationsArray',function(){
        test('all images are in the array',function(){
            //arrange
            //act
            var allImages = CarouselSlider.getAllImageFileLocationsArray();
            //assert
            expect(allImages.length).toEqual(10);
        });
    });


    describe('function setCarouselDirection and getCarouselDirection',function(){
        test('set carousel direction to right',function(){
            //arrange
            CarouselSlider.setCarouselDirection('right');
            //act
            let result = CarouselSlider.getCarouselDirection();
            //assert
            expect(result).toEqual('right');
        })
    });
     
   

    describe('function isSetConsecutiveElementsClasses', function(){
        test('element1 updated once - element2 updated once', function(){
            //arrange           
            let direction = 'left';
            let windowWidth = window.innerWidth || 1024;
            let distanceLeftBeyondWindowWidth = ((windowWidth *-1) - 50);            
            let distanceLeftInsideWindowWidth =  50;
            const mockedElementDOM = {offsetLeft:distanceLeftBeyondWindowWidth, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };
            const mockedElementDOM2 = {offsetLeft:distanceLeftInsideWindowWidth, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };

            let referenceLocationPoint = -150;
            //act
            var result = CarouselSlider.isSetConsecutiveElementsClasses(direction,mockedElementDOM,mockedElementDOM2,referenceLocationPoint);
            //assert
            expect(result).toEqual(false);
            expect(mockedElementDOM.classList.add).toHaveBeenCalledTimes(1);
            expect(mockedElementDOM.classList.remove).toHaveBeenCalledTimes(1);
            expect(mockedElementDOM2.classList.add).toHaveBeenCalledTimes(1);
            expect(mockedElementDOM2.classList.remove).toHaveBeenCalledTimes(1);
            
        })

        test('element1 updated twice - element2 updated twice', function(){
            //arrange           
            let direction = 'left';
            let windowWidth = window.innerWidth || 1024;
            let distanceLeftBeyondWindowWidth = ((windowWidth *-1) - 50);            
            let distanceLeftInsideWindowWidth =  50;
            const mockedElementDOM = {offsetLeft:distanceLeftBeyondWindowWidth, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };
            const mockedElementDOM2 = {offsetLeft:distanceLeftBeyondWindowWidth, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };

            let referenceLocationPoint = -150;
            //act
            var result = CarouselSlider.isSetConsecutiveElementsClasses(direction,mockedElementDOM,mockedElementDOM2,referenceLocationPoint);
            //assert
            expect(result).toEqual(true);
            expect(mockedElementDOM.classList.add).toHaveBeenCalledTimes(2);
            expect(mockedElementDOM.classList.remove).toHaveBeenCalledTimes(2);
            expect(mockedElementDOM2.classList.add).toHaveBeenCalledTimes(2);
            expect(mockedElementDOM2.classList.remove).toHaveBeenCalledTimes(2);
            
        })
    });

    describe('function runImageSlider', function(){
        test('direction left - images Id Order: image0 then image1', function(){
            //arrange
            //Set up our document body
            document.body.innerHTML =
            '<div>' +
            '  <div id="image0" class="sliding-image display"> </div>' +
            '  <div id="image1" class="sliding-image hide"> </div>' +
            '  <div id="image2" class="sliding-image hide"> </div>' +
            '</div>';
            let direction = 'left';
            let initialPoint = 0;
            //act                
            CarouselSlider.runImageSlider(initialPoint,direction);
            let currentImageArray = document.getElementsByClassName('display');
            let currentImage = currentImageArray[0];
            var nextImageArray = document.getElementsByClassName('displayNext');
            var nextImage = nextImageArray[0];
            //assert
            expect(currentImage.id).toBe('image0');
            expect(nextImage.id).toBe('image1');
        });

        test('direction right - images Id Order: image0 then image2', function(){
            //arrange
            //Set up our document body
            document.body.innerHTML =
            '<div>' +
            '  <div id="image0" class="sliding-image display"> </div>' +
            '  <div id="image1" class="sliding-image hide"> </div>' +
            '  <div id="image2" class="sliding-image hide"> </div>' +
            '</div>';
            let direction = 'right';
            let initialPoint = 0;
            //act                
            CarouselSlider.runImageSlider(initialPoint,direction);
            let currentImageArray = document.getElementsByClassName('display');
            let currentImage = currentImageArray[0];
            var nextImageArray = document.getElementsByClassName('displayNext');
            var nextImage = nextImageArray[0];
            //assert
            expect(currentImage.id).toBe('image0');
            expect(nextImage.id).toBe('image2');
        });
    });



    describe('function resolveImageElementNextInitialPosition', function(){
        test('direction left - image elementNext initial Position is currentElement.offsetLeft + currentElement.clientWidth',function(){
            //arrange
            let direction = 'left';
            const mockedElementDOM = {clientWidth: 150,offsetLeft:50, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };
            const mockedElementDOM2 = {clientWidth: 150, offsetLeft:20,style:{left:'20px' },classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };

            //act
            CarouselSlider.resolveImageElementNextInitialPosition(mockedElementDOM, mockedElementDOM2,direction);
            var element2StyleLeft = ''+(mockedElementDOM.offsetLeft + mockedElementDOM.clientWidth )+ 'px';

            //assert
            expect(mockedElementDOM2.style.left).toEqual(element2StyleLeft);
        });

        test('direction right - image elementNext initial Position is currentElement.offsetLeft - nextElement.clientWidth',function(){
            //arrange
            let direction = 'right';
            const mockedElementDOM = {clientWidth: 150,offsetLeft:50, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };
            const mockedElementDOM2 = {clientWidth: 150, offsetLeft:20,style:{left:'20px' },classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };

            //act
            CarouselSlider.resolveImageElementNextInitialPosition(mockedElementDOM, mockedElementDOM2,direction);
            var element2StyleLeft = ''+(mockedElementDOM.offsetLeft - mockedElementDOM2.clientWidth )+ 'px';

            //assert
            expect(mockedElementDOM2.style.left).toEqual(element2StyleLeft);
        });
    });

    describe('function resolveConsecutiveImagesMovingPositions', function(){
        test('direction left - current Image will move 2 pixels to Left',function(){
            //arrange
            var fakeTimer = jest.useFakeTimers();
            let startingPoint = 0;
            let direction = 'left';

            const mockedElementDOM = {clientWidth: 150,offsetLeft:50, style:{left:'50px' }, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };
            const mockedElementDOM2 = {clientWidth: 150, offsetLeft:-20,style:{left:'-20px' }, classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } };

            //act
            CarouselSlider.resolveConsecutiveImagesMovingPositions(mockedElementDOM, mockedElementDOM2, startingPoint, direction);
            fakeTimer.advanceTimersByTime(1000);
            var mockedElementDOMEndingPositionLeft = '-2px';
            fakeTimer.clearAllTimers();
            //assert
            expect(mockedElementDOM.style.left).toBe(mockedElementDOMEndingPositionLeft);
            
        });
    });


    describe('function setConsecutiveImagesPosition', function(){
        test('direction: left - click: right - images swap classNames', function(){
            //arrange
            // Set up our document body
            document.body.innerHTML =
            '<div>' +
            '  <div id="image0" class="sliding-image display"> </div>' +
            '  <div id="image1" class="sliding-image displayNext"> </div>' +
            '  <div id="image2" class="sliding-image hide"> </div>' +
            '</div>';
            let direction = 'left';
            let clickDirectionR = 'right';
            CarouselSlider.setConsecutiveImagesPosition(direction,clickDirectionR);
            //act
            let currentImageArray = document.getElementsByClassName('display');
            let currentImage = currentImageArray[0];
            var nextImageArray = document.getElementsByClassName('displayNext');
            var nextImage = nextImageArray[0];
            //assert
            expect(currentImage.id).toBe('image1');
            expect(nextImage.id).toBe('image0');
        });
        
        test('direction: left - click: left - images keep original classNames', function(){
            //arrange
            // Set up our document body
            document.body.innerHTML =
            '<div>' +
            '  <div id="image0" class="sliding-image display"> </div>' +
            '  <div id="image1" class="sliding-image displayNext"> </div>' +
            '  <div id="image2" class="sliding-image hide"> </div>' +
            '</div>';
            let direction = 'left';
            let clickDirectionR = 'left';
            CarouselSlider.setConsecutiveImagesPosition(direction,clickDirectionR);
            //act
            let currentImageArray = document.getElementsByClassName('display');
            let currentImage = currentImageArray[0];
            var nextImageArray = document.getElementsByClassName('displayNext');
            var nextImage = nextImageArray[0];
            //assert
            expect(currentImage.id).toBe('image0');
            expect(nextImage.id).toBe('image1');
        }) 
    });
    
})