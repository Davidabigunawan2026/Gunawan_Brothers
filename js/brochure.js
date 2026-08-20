/* ==================================================
   BROCHURE / FLYER CAROUSEL
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const carousel =
        document.querySelector(".brochure-carousel");

    const track =
        document.querySelector(".brochure-track");

    const modal =
        document.querySelector(".brochure-modal");

    const modalImage =
        document.getElementById("brochureLargeImage");

    const closeButton =
        document.querySelector(".brochure-close");


    /* ==============================================
       CHECK ELEMENTS
    ============================================== */

    if (
        !carousel ||
        !track ||
        !modal ||
        !modalImage
    ) {
        console.log(
            "Brochure elements not found."
        );
        return;
    }


    /* ==============================================
       GET EXISTING THUMBNAILS
    ============================================== */

    const thumbnails =
        track.querySelectorAll("img");

    /* ==============================================
       CREATE CLONES
    ============================================== */

    thumbnails.forEach(function (image) {

        const clone =
            image.cloneNode(true);

        clone.classList.add(
            "brochure-clone"
        );
        track.appendChild(clone);

    });


    /* ==============================================
       CLICK THUMBNAIL
    ============================================== */

    track.addEventListener(
        "click",
        function (event) {

            const image =
                event.target.closest("img");

            if (!image) {
                return;
            }

            /* Pause carousel */
            track.classList.add(
                "paused"
            );


            /* Put clicked image
               into popup */
            modalImage.src =
                image.src;

            /* Show popup */
            modal.classList.add(
                "active"
            );

        }
    );


    /* ==============================================
       MOUSE ENTER
    ============================================== */

    carousel.addEventListener(
        "mouseenter",
        function () {

            track.classList.add(
                "paused"
            );

        }
    );


    /* ==============================================
       MOUSE LEAVE
    ============================================== */

    carousel.addEventListener(
        "mouseleave",
        function () {

            if (
                !modal.classList.contains(
                    "active"
                )
            ) {

                track.classList.remove(
                    "paused"
                );

            }

        }
    );


    /* ==============================================
       CLOSE POPUP
    ============================================== */

    function closeModal() {

        modal.classList.remove(
            "active"
        );

        track.classList.remove(
            "paused"
        );

    }


    /* ==============================================
       CLOSE BUTTON
    ============================================== */

    closeButton.addEventListener(
        "click",
        closeModal
    );


    /* ==============================================
       CLICK OUTSIDE IMAGE
    ============================================== */

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {
                closeModal();
            }

        }
    );


    /* ==============================================
       ESC KEY
    ============================================== */

    document.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Escape") {
                closeModal();
            }

        }
    );

});

