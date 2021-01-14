const display = 'display';
const displayNext = 'displayNext';
const hide = 'hide';
var standardSpeed = 3000;
var initialPoint = '0px';
var defaultIntervalSpeedMilliseconds = 5000;
var directionSet = '';
var timerToLeftId = 0;
var timerToRightId = 0;
var carouselIsActive = true;


function insertImagesInTargetElement(){

    var target = document.getElementsByClassName('hero-carousel');
    if(isValid(target)){
        var fileLocation = [
            './src/assets/images/ringpixel-bee-6XjrarDC97U-unsplash.jpg',
                './src/assets/images/diamond-1186139_1920.jpg',
                './src/assets/images/ring-heather-mount-ph3z4KuJ4OA-unsplash.jpg',
                 './src/assets/images/diamond-1199183_1920.jpg' ,
                 './src/assets/images/ringringkuromi-lu-_OG-hxrBSUQ-unsplash.jpg'
                 ,
                 './src/assets/images/diamond-1839031_1920.jpg',
                  './src/assets/images/necklacerose-3030462_1920.jpg',
                  './src/assets/images/ringamethyst-2186842_1920.jpg',
                  './src/assets/images/diamonds-2142417_1280.jpg',
                  './src/assets/images/ringwedding-812967_1920.jpg'
        ];

        var imageElementsArray = [];

        for(var a = 0; a<fileLocation.length ; a++){
            var imageElement = document.createElement('IMG');
            imageElement.src = fileLocation[a];
            imageElement.classList.add('sliding-image');
            var selectedClass =(a === 0 ) ? display : hide;
            imageElement.classList.add(selectedClass);
            imageElementsArray.push(imageElement);
        }

        for(var b = 0 ;b<imageElementsArray.length;b++){
            target[0].appendChild(imageElementsArray[b]);
        }        
    }
}

function isValid(input){
    if(input !=undefined && input != null){
        return true;
    }
    return false;
}


function clearSelectedClass(arrayObj, className, minimumClassCount){
    var cloneArrayObj = []
    for(var a = 0; a<arrayObj.length; a++){
        cloneArrayObj.push(arrayObj[a]);
    }
    var counterDisplay=0;
    for(var a = 0; a < cloneArrayObj.length; a++){
        if(cloneArrayObj[a].classList.contains(className)){
            counterDisplay++;
        }

        if(counterDisplay>minimumClassCount){
            cloneArrayObj[a].classList.remove(className);
            counterDisplay--;
        }
    }
    return cloneArrayObj;
}

function runImageSliderFromRightToLeft(){
    var imageContainer = document.getElementsByClassName('hero-carousel');
    var imageContainerWidth = imageContainer[0].clientWidth;

    //var slidingImages =$('.sliding-image');
    var activeIndex = 0;
    var slidingImagesRaw =$('.sliding-image');
    var slidingImagesCleared = clearSelectedClass(slidingImagesRaw,display,1);
    var slidingImages = clearSelectedClass(slidingImagesCleared,displayNext,0);
    

    for(var a = 0; a < slidingImages.length; a++){
        if(slidingImages[a].classList.contains(display)){
            activeIndex = a;
			var leftBeyondBrowserDisplay= '-'+(slidingImages[a].width)+'px';
            setCurrentImageSlideAnimation(slidingImages[a],initialPoint,leftBeyondBrowserDisplay,standardSpeed);
        
            var next = (activeIndex === slidingImages.length-1)? 0: activeIndex+1; 
            var selectedWidthPx = '' + (imageContainerWidth -5)+ 'px';
           setNextImageSlideAnimation(slidingImages[next],selectedWidthPx,initialPoint,standardSpeed);
        
        }
    }
}



function runImageSliderFromLeftToRight(){
    var imageContainer = document.getElementsByClassName('hero-carousel');
    var imageContainerWidth = imageContainer[0].clientWidth;

    var slidingImages =$('.sliding-image');
    var activeIndex = 0;
    for(var a = 0; a < slidingImages.length; a++){
        if(slidingImages[a].classList.contains(display)){
            activeIndex = a;
			var beyondBrowserDisplay= '+'+(slidingImages[a].width)+'px';
            setCurrentImageSlideAnimation(slidingImages[a],initialPoint,beyondBrowserDisplay,standardSpeed);
            var next = (activeIndex === 0)? slidingImages.length-1: activeIndex-1; 
            var selectedWidthPx = '-' + (imageContainerWidth - 5) + 'px';
            setNextImageSlideAnimation(slidingImages[next],selectedWidthPx,initialPoint,standardSpeed);

        }
    }
}



function setCurrentImageSlideAnimation(selecteSlidingImage, distanceFromPx,distanceToPx, selectedSpeed ){
    $(selecteSlidingImage).css({'left':distanceFromPx})
    .animate({left: distanceToPx},selectedSpeed,function(){/**Callback function */})
    .promise().done(function(result){
        selecteSlidingImage.classList.remove(display);
        selecteSlidingImage.classList.add(hide);
        $(selecteSlidingImage).css({'left':distanceFromPx});
    });
}

function setNextImageSlideAnimation(selecteSlidingImage,distanceFromPx,distanceToPx, selectedSpeed){
    selecteSlidingImage.classList.remove(hide);
    selecteSlidingImage.classList.add(displayNext);
    $(selecteSlidingImage).css({'left':distanceFromPx})
    .animate({left: distanceToPx},selectedSpeed,function(){/**Callback function */})
    .promise().done(function(result){
        selecteSlidingImage.classList.remove(displayNext);
        selecteSlidingImage.classList.add(display);
        $(selecteSlidingImage).css({'left':distanceToPx});
    });
}


var setCarouselDirection = function(direction){
    if(!carouselIsActive){return;}
    if(direction === directionSet){ return; }
    directionSet = direction;
    clearInterval(timerToLeftId);
    clearInterval(timerToRightId);

    if(direction === 'slideToLeft'){
        timerToLeftId = setInterval(runImageSliderFromRightToLeft,defaultIntervalSpeedMilliseconds)
    }
    if(direction === 'slideToRight'){
        timerToRightId =setInterval(runImageSliderFromLeftToRight,defaultIntervalSpeedMilliseconds);
    }
}


var runCarousel = function(){
    insertImagesInTargetElement();
    if(!carouselIsActive){return;}

   timerToLeftId = window.setInterval(function(){
        runImageSliderFromRightToLeft();
        //runImageSliderFromLeftToRight();
    }, defaultIntervalSpeedMilliseconds);    
}


var Carousel = {
    runCarousel : runCarousel,
    setCarouselDirection : setCarouselDirection
}

export default Carousel;
