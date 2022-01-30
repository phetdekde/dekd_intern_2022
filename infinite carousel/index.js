const back = document.getElementById('back');
const next = document.getElementById('next');
const imgList = document.getElementsByTagName('img');
const dotList = document.querySelectorAll('.dot-items');
const sliderRow = document.querySelector('.slider-row');

let currentIndex = 2;
let imgSize = getComputedStyle(document.body).getPropertyValue('--img-width');
let gap = getComputedStyle(document.body).getPropertyValue('--img-gap');

function cloneImg(pos) {
    let elem = document.createElement('img');
    elem.src = imgList[pos].src;
    elem.alt = imgList[pos].alt;
    return elem;
}

function init() {
    // clone first 2 imgs and we will append them
    let first = cloneImg(0);
    let second = cloneImg(1);
    // clone last 2 imgs and we will insert them at the front
    let final = cloneImg(imgList.length - 1);
    let beforeFinal = cloneImg(imgList.length - 2);
    sliderRow.append(first);
    sliderRow.append(second);
    sliderRow.insertBefore(final, sliderRow.firstChild);
    sliderRow.insertBefore(beforeFinal, sliderRow.firstChild);
    // moves to the currentIndex(2 in this case) because [0,1] are just the clone
    sliderRow.style.transform = `translateX(calc(${currentIndex} * (${imgSize} + ${gap}) * -1))`;
}

init();

back.addEventListener('click', () => {
    scrollTo(currentIndex - 1);
});

next.addEventListener('click', () => {
    scrollTo(currentIndex + 1);
});

for (let i = 0; i < dotList.length; i++) {
    dotList[i].addEventListener('click', () => {
        // we always have to + 2 because
        // the first index of dotList is 0
        // meanwhile the first picture of imgList starts at 2
        scrollTo(i + 2);
    });
}

function scrollTo(newIndex) {
    dotList[currentIndex - 2].classList.remove('selected');
    // if we move to the clone at the end
    //      .selected at dotList[0]
    // else if we move to the clone at the beginning
    //      .selected at dotList[last]
    if (newIndex === imgList.length - 2) {
        dotList[0].classList.add('selected');
    } else if (newIndex === 1) {
        dotList[dotList.length - 1].classList.add('selected');
    } else {
        dotList[newIndex - 2].classList.add('selected');
    }

    sliderRow.style.transition = '0.3s ease-in-out';
    sliderRow.style.transform = `translateX(calc(${newIndex} * (${imgSize} + ${gap}) * -1))`;
    currentIndex = newIndex;
} 

sliderRow.addEventListener('transitionend', () => {
    // this is for when we reach the clone element
    // we will normally use our transform but this time our transition will be 'none'
    if(currentIndex === 1) {
        sliderRow.style.transition = 'none';
        sliderRow.style.transform = `translateX(calc(${imgList.length - 3} * (${imgSize} + ${gap}) * -1))`;
        currentIndex = imgList.length - 3;
    } else if (currentIndex === imgList.length - 2) {
        sliderRow.style.transition = 'none';
        sliderRow.style.transform = `translateX(calc(${2} * (${imgSize} + ${gap}) * -1))`;
        currentIndex = 2;
    }
})