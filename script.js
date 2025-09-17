// Initialize the AOS (Animate on Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true,     // Whether animation should happen only once
        offset: 100,    // Offset (in px) from the original trigger point
    });
});