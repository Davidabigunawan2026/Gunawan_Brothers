/* ==================================================
   PROJECTS — PAPER FLY PREVIEW + MANUAL NAVIGATION
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const slides = Array.from(document.querySelectorAll(".preview-slide"));
    const previousButton = document.querySelector(".preview-prev");
    const nextButton = document.querySelector(".preview-next");
    const currentLabel = document.querySelector(".preview-current");
    const totalLabel = document.querySelector(".preview-total");

    if (!slides.length) return;

    let currentIndex = 0;
    let nextSlideTimer = null;
    let animationTimers = [];

    const startDelay = 2000;
    const flyDuration = 4000;
    const previewPause = 6000;

    if (totalLabel) totalLabel.textContent = String(slides.length);

    function clearTimers() {
        if (nextSlideTimer) {
            clearTimeout(nextSlideTimer);
            nextSlideTimer = null;
        }

        animationTimers.forEach(clearTimeout);
        animationTimers = [];
    }

    function updateCounter() {
        if (currentLabel) currentLabel.textContent = String(currentIndex + 1);
    }

    function resetSlideClasses() {
        slides.forEach(function (slide) {
            slide.classList.remove("active", "paper-start", "paper-fly", "paused");
        });
    }

    function scheduleNext() {
        clearTimeout(nextSlideTimer);
        nextSlideTimer = setTimeout(function () {
            showSlide(currentIndex + 1, true);
        }, startDelay + flyDuration + previewPause);
    }

    function showSlide(index, autoplay) {
        clearTimers();

        currentIndex = (index + slides.length) % slides.length;
        resetSlideClasses();

        const activeSlide = slides[currentIndex];
        activeSlide.classList.add("active", "paper-start");
        updateCounter();

        // Keep the original paper-fly sequence on desktop.
        const flyTimer = setTimeout(function () {
            activeSlide.classList.remove("paper-start");
            activeSlide.classList.add("paper-fly");
        }, startDelay);
        animationTimers.push(flyTimer);

        if (autoplay) scheduleNext();
    }

    function goPrevious() {
        showSlide(currentIndex - 1, true);
    }

    function goNext() {
        showSlide(currentIndex + 1, true);
    }

    if (previousButton) {
        previousButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            goPrevious();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            goNext();
        });
    }

    // Retain the existing click-to-pause / click-to-resume behavior.
    slides.forEach(function (slide, index) {
        slide.addEventListener("click", function () {
            if (index !== currentIndex || !slide.classList.contains("paper-fly")) return;

            if (!slide.classList.contains("paused")) {
                slide.classList.add("paused");
                if (nextSlideTimer) {
                    clearTimeout(nextSlideTimer);
                    nextSlideTimer = null;
                }
            } else {
                slide.classList.remove("paused");
                clearTimeout(nextSlideTimer);
                nextSlideTimer = setTimeout(function () {
                    showSlide(currentIndex + 1, true);
                }, previewPause);
            }
        });
    });

    showSlide(0, true);
});
