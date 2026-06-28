// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 80,
        });
    }
    
    // Booking Widget Logic
    initBookingWidget();

    // Universal Lightbox logic
    initLightbox();
});

// Hamburger Navigation Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger) {
    hamburger.addEventListener("click", mobileMenu);
}

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}

// Meeting Scheduler Widget Interactivity
function initBookingWidget() {
    const calendarGrid = document.getElementById("calendar-days-grid");
    const slotsGrid = document.getElementById("slots-grid-container");
    const confirmBtn = document.getElementById("confirm-booking-btn");
    
    if (!calendarGrid || !slotsGrid || !confirmBtn) return;
    
    let selectedDay = "15"; // Default active day in HTML
    let selectedSlot = "10:00 AM"; // Default active slot in HTML
    
    // Handle Calendar Day selection
    calendarGrid.addEventListener("click", function(e) {
        const target = e.target;
        if (target.classList.contains("calendar-day") && !target.classList.contains("disabled")) {
            // Remove active from previous
            const activeDay = calendarGrid.querySelector(".calendar-day.active");
            if (activeDay) activeDay.classList.remove("active");
            
            // Add active to current
            target.classList.add("active");
            selectedDay = target.getAttribute("data-day");
        }
    });
    
    // Handle Time Slot selection
    slotsGrid.addEventListener("click", function(e) {
        const target = e.target;
        if (target.classList.contains("slot-item")) {
            // Remove active from previous
            const activeSlot = slotsGrid.querySelector(".slot-item.active");
            if (activeSlot) activeSlot.classList.remove("active");
            
            // Add active to current
            target.classList.add("active");
            selectedSlot = target.getAttribute("data-slot");
        }
    });
    
    // Handle Booking Confirmation click
    confirmBtn.addEventListener("click", function() {
        if (!selectedDay) {
            alert("Please select a date on the calendar.");
            return;
        }
        if (!selectedSlot) {
            alert("Please select an available time slot.");
            return;
        }
        
        // Construct the mailto redirect link to inform you immediately of bookings
        const recipientEmail = "misbahullah84@outlook.com";
        const subject = encodeURIComponent("Technical Sync Session Booking Request");
        const bodyText = encodeURIComponent(`Hi Misbah,

I would like to request a 1-on-1 virtual sync session for a technical consultation.

Selected Details:
- Date: July ${selectedDay}, 2026
- Time Slot: ${selectedSlot} (PKT)

Looking forward to your confirmation.

Best regards,`);

        const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${bodyText}`;

        // Show info alert and open user's mail client
        alert(`Booking Request Prepared!\n\nYour session is selected for July ${selectedDay}, 2026 at ${selectedSlot} (PKT).\n\nWe will now open your default mail client to dispatch this request directly to Misbah.`);
        
        window.location.href = mailtoUrl;
    });
}

// Universal full-screen image lightbox
function initLightbox() {
    // Create lightbox elements dynamically so they are available on all pages
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <span id="lightbox-close">&times;</span>
        <img src="" alt="Full-screen View">
    `;
    document.body.appendChild(lightbox);

    const closeBtn = document.getElementById('lightbox-close');
    const lightboxImg = lightbox.querySelector('img');

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Find and attach click events to zoomable images
    const images = document.querySelectorAll('.project-card img, .entry-media img, .about-image img');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
}