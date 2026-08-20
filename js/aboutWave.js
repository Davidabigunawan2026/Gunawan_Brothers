/* ==================================================
   ABOUT GOLD WAVE
   Interactive 3D-style Gold Mesh
   ================================================== */

const aboutCanvas = document.getElementById("aboutCanvas");

if (aboutCanvas) {

    const ctx = aboutCanvas.getContext("2d");


    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let animationId = null;
    let isVisible = false;

    // ------------------------------------------
    // Mouse
    // ------------------------------------------

    const mouse = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        active: false
    };


    // ------------------------------------------
    // Settings
    // ------------------------------------------

    const ROWS = 32;          // jumlah lembar / garis
    const POINTS = 90;        // jumlah titik setiap garis

    const GOLD = {
        r: 212,
        g: 165,
        b: 55
    };


    // ------------------------------------------
    // Resize Canvas
    // ------------------------------------------

    function resizeAboutCanvas() {

        const rect = aboutCanvas.parentElement.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        aboutCanvas.width = width * dpr;
        aboutCanvas.height = height * dpr;

        aboutCanvas.style.width = width + "px";
        aboutCanvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        mouse.x = width / 2;
        mouse.y = height * 0.65;

        mouse.targetX = mouse.x;
        mouse.targetY = mouse.y;
    }


    // ------------------------------------------
    // Mouse Movement
    // ------------------------------------------

    aboutCanvas.addEventListener("mousemove", function (event) {

        const rect = aboutCanvas.getBoundingClientRect();

        mouse.targetX = event.clientX - rect.left;
        mouse.targetY = event.clientY - rect.top;

        mouse.active = true;
    });


    aboutCanvas.addEventListener("mouseleave", function () {

        mouse.active = false;

        mouse.targetX = width / 2;
        mouse.targetY = height * 0.65;
    });


    // ------------------------------------------
    // Smooth Mouse
    // ------------------------------------------

    function updateMouse() {

        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
    }


    // ------------------------------------------
    // Draw Wave
    // ------------------------------------------

    function drawWave(time, row) {

        const rowProgress = row / ROWS;

        /*
         * Posisi dasar lembaran
         * semakin ke bawah semakin besar
         */

        const baseY =
            height * 0.48 +
            rowProgress * height * 0.58;


        ctx.beginPath();

        for (let i = 0; i <= POINTS; i++) {

            const x = (i / POINTS) * width;

            /*
             * Gelombang utama
             */

            const wave1 =
                Math.sin(
                    i * 0.075 +
                    time * 0.00035 +
                    row * 0.18
                ) * 28;


            /*
             * Gelombang kedua
             */

            const wave2 =
                Math.sin(
                    i * 0.035 -
                    time * 0.00022 +
                    row * 0.35
                ) * 18;


            /*
             * Efek mouse
             *
             * Gelombang tertarik sedikit
             * ke arah posisi mouse
             */

            const dx = x - mouse.x;

            const distance = Math.abs(dx);

            const influence =
                Math.max(0, 1 - distance / 500);


            const mouseWave =
                Math.sin(
                    dx * 0.018
                ) *
                influence *
                35;


            /*
             * Posisi Y akhir
             */

            const y =
                baseY +
                wave1 +
                wave2 +
                mouseWave *
                (0.3 + rowProgress);


            if (i === 0) {

                ctx.moveTo(x, y);

            } else {

                ctx.lineTo(x, y);
            }
        }


        // --------------------------------------
        // Mouse brightness
        // --------------------------------------

        const glowDistance =
            Math.abs(baseY - mouse.y);

        const glow =
            Math.max(
                0,
                1 - glowDistance / 300
            );


        /*
         * Garis lebih terang
         * ketika dekat mouse
         */

        const alpha =
            0.08 +
            glow * 0.35;


        ctx.strokeStyle =
            `rgba(
                ${GOLD.r},
                ${GOLD.g},
                ${GOLD.b},
                ${alpha}
            )`;


        ctx.lineWidth =
            0.7 +
            glow * 1.5;


        ctx.shadowBlur =
            glow * 12;


        ctx.shadowColor =
            `rgba(
                ${GOLD.r},
                ${GOLD.g},
                ${GOLD.b},
                ${glow * 0.6}
            )`;


        ctx.stroke();

        ctx.shadowBlur = 0;
    }


    // ------------------------------------------
    // Mouse Glow
    // ------------------------------------------

    function drawMouseGlow() {

        if (!mouse.active) return;


        const gradient =
            ctx.createRadialGradient(
                mouse.x,
                mouse.y,
                0,
                mouse.x,
                mouse.y,
                230
            );


        gradient.addColorStop(
            0,
            "rgba(255, 210, 90, 0.16)"
        );


        gradient.addColorStop(
            0.35,
            "rgba(220, 170, 50, 0.08)"
        );


        gradient.addColorStop(
            1,
            "rgba(220, 170, 50, 0)"
        );


        ctx.fillStyle = gradient;

        ctx.fillRect(
            mouse.x - 230,
            mouse.y - 230,
            460,
            460
        );
    }



// ------------------------------------------
// Animation
// ------------------------------------------

function animateAboutWave(time) {

    // Jika About tidak terlihat,
    // jangan jalankan animasi
    if (!isVisible) {

        animationId = null;

        return;
    }


    updateMouse();


    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    // --------------------------------------
    // Wave layer
    // --------------------------------------

    for (let row = 0; row < ROWS; row++) {

        drawWave(time, row);
    }

    // --------------------------------------
    // Mouse illumination
    // --------------------------------------

    drawMouseGlow();


    // Lanjutkan animasi
    animationId =
        requestAnimationFrame(
            animateAboutWave
        );
}


    // ------------------------------------------
    // Start
    // ------------------------------------------

    resizeAboutCanvas();

    window.addEventListener(
        "resize",
        resizeAboutCanvas
    );

    // ------------------------------------------
    // VISIBILITY CONTROL
    // ------------------------------------------

    const aboutSection =
        document.getElementById("about");


    if (aboutSection) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    const entry = entries[0];

                    isVisible =
                        entry.isIntersecting;


                    // ----------------------------------
                    // ABOUT AKTIF
                    // ----------------------------------

                    if (isVisible) {

                        if (animationId === null) {

                            animationId =
                                requestAnimationFrame(
                                    animateAboutWave
                                );
                        }

                    }


                    // ----------------------------------
                    // ABOUT TIDAK AKTIF
                    // ----------------------------------

                    else {

                        if (animationId !== null) {

                            cancelAnimationFrame(
                                animationId
                            );

                            animationId = null;
                        }
                    }

                },
                {
                    threshold: 0.01
                }
            );


        observer.observe(aboutSection);
    }


    resizeAboutCanvas();
    window.addEventListener(
        "resize",
        resizeAboutCanvas
    );


}


