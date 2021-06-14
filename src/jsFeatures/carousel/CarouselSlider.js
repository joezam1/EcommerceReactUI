import CarouselHelper from './CarouselHelper.js';
import Utils from '../../library/Utils.js';
import DomUtils from '../../library/DomUtils.js';


    const display = 'display';
    const displayNext = 'displayNext';
    const hide = 'hide';
    var pixelsMovementPerInterval = 2;
    var frequencySliderInterval = 50;
    var initialCarouselPoint = 0;
    var runCarousel = true;
    var sliderIntervalId = 0;
    var carouselDirection = 'left';

    //tested--
    function setCarouselDirection(direction){
        carouselDirection = direction;
    }

    //tested--
    function getCarouselDirection(){
        return carouselDirection;
    }

    //test not-required
    function setStandardCarouselSliderSpeed(){
        pixelsMovementPerInterval = 1;
        frequencySliderInterval = 25;
    }

    //test not-required
    function setFastCarouselSliderSpeed(){
        pixelsMovementPerInterval = 20;
        frequencySliderInterval = 1;    
    }

    //tested--
    function getAllImageFileLocationsArray(){
        var fileLocationArray = [
            './assets/images/ringpixel-bee-6XjrarDC97U-unsplash.jpg',
            './assets/images/diamond-1186139_1920.jpg',
            './assets/images/ring-heather-mount-ph3z4KuJ4OA-unsplash.jpg',
            './assets/images/diamond-1199183_1920.jpg' ,
            './assets/images/ringringkuromi-lu-_OG-hxrBSUQ-unsplash.jpg',
            './assets/images/diamond-1839031_1920.jpg',
            './assets/images/necklacerose-3030462_1920.jpg',
            './assets/images/ringamethyst-2186842_1920.jpg',
            './assets/images/diamonds-2142417_1280.jpg',
            './assets/images/ringwedding-812967_1920.jpg'
        ];
        return fileLocationArray
    }

    //tested--
    function isSetConsecutiveElementsClasses(direction, element1Current, element2Next, referenceLocationPoint){
        var isCurrentImageCycleComplete = CarouselHelper.hasCurrentElementReachedEndingPosition(direction, element1Current);
        if(isCurrentImageCycleComplete){
            DomUtils.setElementAddRemoveClasses(element1Current,hide, display);
            DomUtils.setElementAddRemoveClasses(element2Next,display,displayNext);    
        }
        var isNextImageCycleComplete = CarouselHelper.hasNextElementReachedEndingPosition(direction, element2Next,referenceLocationPoint);
        if(isNextImageCycleComplete){
            DomUtils.setElementAddRemoveClasses(element1Current,hide, display);
            DomUtils.setElementAddRemoveClasses(element2Next,display,displayNext);
            return true;
        }
        return false;
    }

    //tested the inside functions--
    function init(){
        var imagesLocationFileArray = getAllImageFileLocationsArray();
        var parentNodeTarget = document.getElementById('hero-slider-id');
        var targetNode = document.getElementById('hero-carousel-id');
        var cloneTargetNode = CarouselHelper.insertImagesInTargetElement(targetNode, imagesLocationFileArray);
        if(Utils.isValid(parentNodeTarget)){
            parentNodeTarget.replaceChild(cloneTargetNode, targetNode);
        }
    }

    //tested--
    function runImageSlider(initialPoint, direction){
        var slidingImages = document.getElementsByClassName('sliding-image');
        for(var a = 0; a < slidingImages.length; a++){
            if(slidingImages[a].classList.contains(display)){
                var next = CarouselHelper.getNextArrayElementIndexByDirection(direction ,a ,slidingImages.length);           
                setConsecutiveImageSlideAnimation(slidingImages[a],slidingImages[next],initialPoint, direction);
                runCarousel = false;
            }
        }
    }

    //tested function container by testing the functions inside--
    function setConsecutiveImageSlideAnimation(imageElement1Current, imageElement2Next, startingPoint, direction){    
        resolveImageElementNextInitialPosition(imageElement1Current, imageElement2Next, direction);
        resolveConsecutiveImagesMovingPositions(imageElement1Current, imageElement2Next, startingPoint, direction);
    }

    //tested--
    function resolveImageElementNextInitialPosition(imageElement1Current,elementNext,direction){
        var image2InitialPositionLeft = CarouselHelper.getNextElementInitialPositionLeftByDirection(imageElement1Current,elementNext,direction);  
        elementNext.style.left = image2InitialPositionLeft+ 'px';
        DomUtils.setElementAddRemoveClasses(elementNext,displayNext, hide);
    }

    //tested--
    function resolveConsecutiveImagesMovingPositions(imageElement1Current, imageElement2Next, startingPoint, direction){
        var directionFactor = CarouselHelper.getDirectionFactor(direction);
        var movingPointImage1 = startingPoint;
        sliderIntervalId = setInterval(function(){
        movingPointImage1 =  movingPointImage1 + ( pixelsMovementPerInterval * directionFactor);    
        imageElement1Current.style.left =''+ movingPointImage1 + 'px';
        var movingPointImage2 = CarouselHelper.getNextElementCurrentPositionLeftByDirection(imageElement1Current,imageElement2Next, direction);
    
        imageElement2Next.style.left ='' + movingPointImage2 + 'px';  
        var cycleIsCompleted = isSetConsecutiveElementsClasses(direction,imageElement1Current,imageElement2Next, initialCarouselPoint)
        if(cycleIsCompleted){
            clearInterval(sliderIntervalId);
            setStandardCarouselSliderSpeed();
            runCarousel = true;
        }
        },frequencySliderInterval);
    }

    //tested--
    function setButtonLeft(){
        setConsecutiveImagesPosition(carouselDirection,'left');
    }

    //tested--
    function setButtonRight(){
        setConsecutiveImagesPosition(carouselDirection, 'right');
    }

    //tested--
    function setConsecutiveImagesPosition(currentDirection, clickDirection){
        clearInterval(sliderIntervalId);
        setFastCarouselSliderSpeed();
        var currentActiveImageArray = document.getElementsByClassName(display);
        var currentActiveImage = currentActiveImageArray[0];
        
        var slidingImages = document.getElementsByClassName('sliding-image');
        var nextActiveImageArray = document.getElementsByClassName(displayNext);
        var nextActiveImage = (nextActiveImageArray.length==0) ? 
                            CarouselHelper.getNextArrayElementByDirection(currentDirection, display ,slidingImages) : nextActiveImageArray[0];
        if(currentDirection !== clickDirection){
            //we swap the images
            DomUtils.setElementAddRemoveClasses(currentActiveImage,displayNext,display);
            DomUtils.setElementAddRemoveClasses(nextActiveImage,display,displayNext);
            setCarouselDirection(clickDirection);
            setConsecutiveImageSlideAnimation(nextActiveImage,currentActiveImage,nextActiveImage.offsetLeft,clickDirection);
        }
        else{
            var activeImageLeftPosition = currentActiveImage.offsetLeft;
            runImageSlider(activeImageLeftPosition,currentDirection);
        }   
    }




    function carouselStart(){
        var carouselCounter = 0;
        var carouselContainerIntervalId = setInterval( function(){
            if(runCarousel){
                carouselCounter++;
                console.log('runCarousel: '+carouselCounter);
                setStandardCarouselSliderSpeed();
                runImageSlider(initialCarouselPoint, carouselDirection);
            } 
        },50);
    }


   const CarouselSlider = {
        getAllImageFileLocationsArray,
        setCarouselDirection,
        getCarouselDirection,
        isSetConsecutiveElementsClasses,
        runImageSlider,
        resolveImageElementNextInitialPosition,
        resolveConsecutiveImagesMovingPositions,
        setButtonLeft,
        setButtonRight,
        setConsecutiveImagesPosition,
        init,
        carouselStart
    }

export default CarouselSlider;