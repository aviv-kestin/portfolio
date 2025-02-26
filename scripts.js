const slideshowContainer = document.querySelector(".slideshow");
const slides = document.querySelectorAll(".slideshow img");

let isDragging = false; // Flag for drag state
let startX; // Starting X position
let scrollLeft; // Initial scroll position
let autoSlideInterval;

// Lock to the closest slide
function lockToClosestSlide() {
    const slideWidth = slideshowContainer.clientWidth; // Width of each slide
    const closestIndex = Math.round(slideshowContainer.scrollLeft / slideWidth); // Find the nearest slide index
    const newScrollLeft = closestIndex * slideWidth; // Calculate the position for the nearest slide

    // Smoothly scroll to the nearest slide
    slideshowContainer.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
    });
}

// Auto-slide functionality
function autoSlide() {
    if (isDragging) return; // Skip auto-slide while dragging
    const slideWidth = slideshowContainer.clientWidth; // Width of each slide
    const nextSlide = (Math.round(slideshowContainer.scrollLeft / slideWidth) + 1) % slides.length; // Go to the next slide
    const newScrollLeft = nextSlide * slideWidth;

    slideshowContainer.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
    });
}

// Drag start
function startDrag(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX; // Get the initial position of the drag
    scrollLeft = slideshowContainer.scrollLeft; // Record the initial scroll position
    clearInterval(autoSlideInterval); // Pause auto-slide during drag
    slideshowContainer.classList.add("dragging"); // Optional: Add a dragging class for styling feedback
}

// During dragging
function onDrag(e) {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX; // Get the current mouse/touch position
    const distance = x - startX; // Calculate the drag distance
    slideshowContainer.scrollLeft = scrollLeft - distance * 1.3; // Adjust the scroll position based on drag
}

// Drag end
function stopDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    slideshowContainer.classList.remove("dragging"); // Remove the dragging class
    lockToClosestSlide(); // Lock to the nearest slide
    startAutoSlide(); // Resume auto-slide
}

// Start auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 3800); // Slide every 4 seconds
}

// Event listeners for dragging
slideshowContainer.addEventListener("mousedown", (e) => {
    e.preventDefault(); // Prevent text selection during drag
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
