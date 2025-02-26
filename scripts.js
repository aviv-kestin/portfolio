const slideshowContainer = document.querySelector(".slideshow");
const slides = document.querySelectorAll(".slideshow img");

let isDragging = false; 
let startX; 
let scrollLeft;
let autoSlideInterval;


function lockToClosestSlide() {
    const slideWidth = slideshowContainer.clientWidth; 
    const closestIndex = Math.round(slideshowContainer.scrollLeft / slideWidth); 
    const newScrollLeft = closestIndex * slideWidth; 

    
    slideshowContainer.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
    });
}


function autoSlide() {
    if (isDragging) return; 
    const slideWidth = slideshowContainer.clientWidth; 
    const nextSlide = (Math.round(slideshowContainer.scrollLeft / slideWidth) + 1) % slides.length; 
    const newScrollLeft = nextSlide * slideWidth;

    slideshowContainer.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
    });
}


function startDrag(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX; 
    scrollLeft = slideshowContainer.scrollLeft; 
    clearInterval(autoSlideInterval); 
    slideshowContainer.classList.add("dragging"); 
}


function onDrag(e) {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX; 
    const distance = x - startX; 
    slideshowContainer.scrollLeft = scrollLeft - distance * 1.3; 
}


function stopDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    slideshowContainer.classList.remove("dragging"); 
    lockToClosestSlide(); 
    startAutoSlide(); 
}

// Start auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 3800); 
}

// Event listeners for dragging
slideshowContainer.addEventListener("mousedown", (e) => {
    e.preventDefault(); 
    startDrag(e);
});
slideshowContainer.addEventListener("mousemove", onDrag);
slideshowContainer.addEventListener("mouseup", stopDrag);
slideshowContainer.addEventListener("mouseleave", stopDrag);
slideshowContainer.addEventListener("touchstart", startDrag);
slideshowContainer.addEventListener("touchmove", onDrag);
slideshowContainer.addEventListener("touchend", stopDrag);

// Initialize auto-slide
startAutoSlide();
