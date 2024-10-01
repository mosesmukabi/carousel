const carousel = document.querySelector(".carousel");
const bullets = document.querySelectorAll(".bullet");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let isDragging = false;
let startX;
let scrollLeft;

// Carousel drag functionality
const startDragging = (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
};

const stopDragging = () => {
    isDragging = false;
};

const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    carousel.scrollLeft = scrollLeft - walk;
};

carousel.addEventListener("mousedown", startDragging);
carousel.addEventListener("mouseleave", stopDragging);
carousel.addEventListener("mouseup", stopDragging);
carousel.addEventListener("mousemove", dragging);

// Arrow functionality
leftArrow.addEventListener("click", () => {
    carousel.scrollLeft -= carousel.offsetWidth;
    updateBullets();
});

rightArrow.addEventListener("click", () => {
    carousel.scrollLeft += carousel.offsetWidth;
    updateBullets();
});

// Bullet functionality
bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        const scrollPosition = carousel.offsetWidth * index;
        carousel.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
        });
        updateBullets(index);
    });
});

// Update active bullets
function updateBullets(activeIndex) {
    bullets.forEach((bullet, index) => {
        if (activeIndex === undefined) {
            const carouselPos = carousel.scrollLeft;
            const totalWidth = carousel.scrollWidth - carousel.clientWidth;
            const percentageScrolled = carouselPos / totalWidth;

            const activeBullet = Math.round(percentageScrolled * (bullets.length - 1));
            if (activeBullet === index) {
                bullet.classList.add("active");
            } else {
                bullet.classList.remove("active");
            }
        } else {
            if (index === activeIndex) {
                bullet.classList.add("active");
            } else {
                bullet.classList.remove("active");
            }
        }
    });
}
