const back = document.getElementById('back');
const next = document.getElementById('next');
const imgList = document.getElementsByTagName('img');
const dotList = document.querySelectorAll('.dot-items');
let currentPage = 0;

back.addEventListener('click', () => {
    if(currentPage > 0) {
        scrollTo(currentPage - 1);
    } else {
        scrollTo(imgList.length - 1);
    }
});

next.addEventListener('click', () => {
    if(currentPage < imgList.length - 1) {
        scrollTo(currentPage + 1);
    } else {
        scrollTo(0);
    }
});

for (let i = 0; i < dotList.length; i++) {
    dotList[i].addEventListener('click', () => {
        scrollTo(i);
    });
}

const scrollTo = (selectedPage) => {
    dotList[currentPage].classList.toggle('selected');
    dotList[selectedPage].classList.toggle('selected');
    imgList[selectedPage].scrollIntoView({
        inline: 'center' 
    });
    currentPage = selectedPage;
} 