/* ==================================================
   PROJECT PREVIEW — PAPER FLY
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const slides =
        document.querySelectorAll(".preview-slide");

    let currentIndex = 0;

    const displayTime = 8000;


    /* ==============================================
       SHOW NEXT SLIDE
    ============================================== */

    function showNextSlide() {

        /* Hapus active dari semua gambar */
        slides.forEach(function (slide) {

            slide.classList.remove("active");

        });


        /* Ambil satu gambar */
        const currentSlide =
            slides[currentIndex];


        /* Tampilkan gambar */
        currentSlide.classList.add("active");


        /* Pindah ke gambar berikutnya */
        currentIndex++;


        /* Jangan menghitung gambar clone */
        if (currentIndex >= slides.length - 1) {

            currentIndex = 0;

        }


        /* Jalankan gambar berikutnya */
        setTimeout(
            showNextSlide,
            displayTime
        );

    }


    /* ==============================================
       START
    ============================================== */

    showNextSlide();

});


