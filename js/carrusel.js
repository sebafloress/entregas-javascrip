let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

document.getElementById('prevBtn').addEventListener('click', () => {
    showPrevItem();
    resetAutoSlide();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    showNextItem();
    resetAutoSlide();
});

function showPrevItem() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    items[currentIndex].classList.add('active');
    updateCarousel();
}

function showNextItem() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    items[currentIndex].classList.add('active');
    updateCarousel();
}

function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

let autoSlideTimeout;

function empiezaAutoSlide() {
    autoSlideTimeout = setTimeout(() => {
        showNextItem();
        empiezaAutoSlide();
    }, 5000);
}

function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    empiezaAutoSlide();
}

window.onload = function() {
    empiezaAutoSlide();
};

