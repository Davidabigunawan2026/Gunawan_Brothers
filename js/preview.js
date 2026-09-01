/* ==================================================
   PROJECTS — PAPER FLY PREVIEW
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const slides =
        document.querySelectorAll(".preview-slide");

    let currentIndex = 0;


    /* ----------------------------------------------
       WAKTU ANIMASI
       ---------------------------------------------- */

    const startDelay = 2000;      // diam di titik awal
    const flyDuration = 3000;     // durasi paper fly
    const previewPause = 6000;    // diam setelah 100%


    /* ----------------------------------------------
       TIMER
    ---------------------------------------------- */

    let nextSlideTimer = null;


    /* ----------------------------------------------
       ANIMASI SATU GAMBAR
       ---------------------------------------------- */

    function animateSlide(slide) {

        /* Bersihkan class */

        slide.classList.remove(
            "paper-start",
            "paper-fly",
            "paused"
        );


        /* ------------------------------------------
           POSISI AWAL
           ------------------------------------------ */

        slide.classList.add("paper-start");


        /* ------------------------------------------
           SETELAH 2 DETIK
           MULAI PAPER FLY
           ------------------------------------------ */

        setTimeout(function () {

            slide.classList.remove("paper-start");
            slide.classList.add("paper-fly");

        }, startDelay);


        /* ------------------------------------------
           SETELAH FLY SELESAI
           TUNGGU PREVIEW PAUSE
           ------------------------------------------ */

        nextSlideTimer = setTimeout(function () {

            showNextSlide();

        }, startDelay + flyDuration + previewPause);

    }


    /* ----------------------------------------------
       TAMPILKAN GAMBAR BERIKUTNYA
       ---------------------------------------------- */

    function showNextSlide() {

        /* Bersihkan timer sebelumnya */

        if (nextSlideTimer) {

            clearTimeout(nextSlideTimer);

            nextSlideTimer = null;

        }


        /* Hilangkan semua slide */

        slides.forEach(function (slide) {

            slide.classList.remove(
                "active",
                "paper-start",
                "paper-fly",
                "paused"
            );

        });


        /* Ambil slide sekarang */
        const currentSlide =
            slides[currentIndex];


        /* Tampilkan */
        currentSlide.classList.add("active");


        /* Jalankan animasi */
        animateSlide(currentSlide);


        /* Pindah index */
        currentIndex++;


        /* Kembali ke gambar pertama */
        if (currentIndex >= slides.length - 1) {

            currentIndex = 0;

        }

    }


    /* ----------------------------------------------
       CLICK = PAUSE / PLAY
    ---------------------------------------------- */

    slides.forEach(function (slide) {

        slide.addEventListener("click", function () {

            /* Hanya bisa diklik setelah
               preview besar */

            if (!slide.classList.contains("paper-fly")) {

                return;

            }


            /* PAUSE */

            if (!slide.classList.contains("paused")) {

                slide.classList.add("paused");

                /* Hentikan timer gambar berikutnya */

                if (nextSlideTimer) {

                    clearTimeout(nextSlideTimer);
                    nextSlideTimer = null;

                }

            }


            /* PLAY */

            else {

                slide.classList.remove("paused");


                /* Mulai kembali countdown */

                nextSlideTimer = setTimeout(function () {

                    showNextSlide();

                }, previewPause);

            }

        });

    });


    /* ----------------------------------------------
       START
       ---------------------------------------------- */

    showNextSlide();

});
