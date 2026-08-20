/* ==================================================
   PROJECT PREVIEW — VERTICAL AUTO SLIDER
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const laptopScreen =
        document.querySelector(".laptop-screen-hotspot");

    const previewArea =
        document.querySelector(".project-preview");

    const previewTrack =
        document.querySelector(".preview-track");

    const slides =
        document.querySelectorAll(".preview-slide");


    /* ==============================================
       SETTINGS
    ============================================== */

    const pauseTime = 4000;
    const moveTime = 2000;

    /* ==============================================
       STATE
    ============================================== */

    let currentIndex = 0;
    let isPlaying = true;
    let timer = null;


    /* ==============================================
       SLIDE HEIGHT + GAP
    ============================================== */

    const slideHeight =
        slides[0].offsetHeight;

    const trackStyle =
        window.getComputedStyle(previewTrack);

    const gap =
        parseFloat(trackStyle.rowGap) || 0;

    const slideStep =
        slideHeight + gap;


    /* ==============================================
       MOVE
    ============================================== */

    function moveNext() {

        currentIndex++;

        previewTrack.style.transform =
            `translateY(-${currentIndex * slideStep}px)`;

    }


    /* ==============================================
       AUTO PLAY
    ============================================== */

    function playNext() {

        if (!isPlaying) {
            return;
        }


        moveNext();


        /*
         * Wait until the movement is finished.
         */

        timer = setTimeout(function () {

            /*
             * Last slide is the clone
             * of the first slide.
             */

            if (currentIndex === slides.length - 1) {

                previewTrack.style.transition = "none";

                currentIndex = 0;

                previewTrack.style.transform =
                    "translateY(0)";


                /*
                 * Force browser to apply
                 * the reset first.
                 */

                previewTrack.offsetHeight;


                /*
                 * Restore animation.
                 */

                previewTrack.style.transition =
                    `transform ${moveTime}ms ease-in-out`;

            }


            /*
             * Wait before next movement.
             */

            if (isPlaying) {

                timer = setTimeout(
                    playNext,
                    pauseTime
                );

            }

        }, moveTime);

    }


    /* ==============================================
       START
    ============================================== */

    timer = setTimeout(
        playNext,
        pauseTime
    );


    /* ==============================================
       PLAY / PAUSE
    ============================================== */

    function togglePreview() {

        isPlaying = !isPlaying;


        if (!isPlaying) {

            clearTimeout(timer);

            timer = null;

            return;
        }


        timer = setTimeout(
            playNext,
            pauseTime
        );

    }


    /* ==============================================
       CLICK PREVIEW
    ============================================== */

    previewArea.addEventListener(
        "click",
        togglePreview
    );


    /* ==============================================
       CLICK LAPTOP
    ============================================== */

    laptopScreen.addEventListener(
        "click",
        togglePreview
    );

    function togglePreview() {

        isPlaying = !isPlaying;

        if (!isPlaying) {
            clearTimeout(timer);
            timer = null;
            return;
        }

        timer = setTimeout(
            playNext,
            pauseTime
        );
    }


});

