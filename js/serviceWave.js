/* ==================================================
   SERVICES COPPER FABRIC WAVE
   Elegant • Slow • Premium
   Copper Gold • Soft Fabric
   ================================================== */

const servicesCanvas = document.getElementById("servicesCanvas");

if (servicesCanvas) {

    const ctx = servicesCanvas.getContext("2d");

    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Kontrol animasi
    let animationId = null;
    let isVisible = false;

    // ==================================================
    // MOUSE
    // ==================================================

    const mouse = {
        x: 0,
        y: 0,

        targetX: 0,
        targetY: 0,

        active: false
    };


    // ==================================================
    // SETTINGS
    // ==================================================

    // Lebih banyak garis = efek kain lebih halus
    const ROWS = 68;

    // Titik lebih banyak = gelombang lebih smooth
    const POINTS = 100;


    // ==================================================
    // COPPER GOLD
    // ==================================================

    const FABRIC = {
        r: 210,
        g: 214,
        b: 218
    };


    // ==================================================
    // RESIZE
    // ==================================================

    function resizeServicesCanvas() {

        const rect =
            servicesCanvas.parentElement.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        servicesCanvas.width = width * dpr;
        servicesCanvas.height = height * dpr;

        servicesCanvas.style.width = width + "px";
        servicesCanvas.style.height = height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        mouse.x = width * 0.5;
        mouse.y = height * 0.5;

        mouse.targetX = mouse.x;
        mouse.targetY = mouse.y;
    }


    // ==================================================
    // MOUSE MOVE
    // ==================================================

    servicesCanvas.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                servicesCanvas.getBoundingClientRect();

            mouse.targetX =
                event.clientX - rect.left;

            mouse.targetY =
                event.clientY - rect.top;

            mouse.active = true;
        }
    );


    servicesCanvas.addEventListener(
        "mouseleave",
        function () {

            mouse.active = false;

            mouse.targetX = width * 0.5;
            mouse.targetY = height * 0.5;
        }
    );


    // ==================================================
    // SMOOTH MOUSE
    // ==================================================

    function updateMouse() {

        mouse.x +=
            (mouse.targetX - mouse.x) * 0.035;

        mouse.y +=
            (mouse.targetY - mouse.y) * 0.035;
    }


    // ==================================================
    // DRAW COPPER FABRIC
    // ==================================================

    function drawFabric(time) {

        for (let row = 0; row < ROWS; row++) {

            const depth =
                row / (ROWS - 1);


            // ------------------------------------------
            // POSISI SETIAP LAPISAN KAIN
            // ------------------------------------------

            const baseY =
                height * 0.08 +
                depth * height * 1.02;


            ctx.beginPath();


            // ------------------------------------------
            // DRAW POINTS
            // ------------------------------------------

            for (let i = 0; i <= POINTS; i++) {

                const progress =
                    i / POINTS;

                const x =
                    progress * width;


                // ======================================
                // LARGE FABRIC FOLD
                // ======================================

                const fold1 =
                    Math.sin(
                        progress * 6.2 +
                        time * 0.00016
                    ) *
                    (28 + depth * 22);


                // ======================================
                // SECOND FOLD
                // ======================================

                const fold2 =
                    Math.sin(
                        progress * 12.5 -
                        time * 0.00010 +
                        row * 0.055
                    ) *
                    9;


                // ======================================
                // LONG SOFT CURVE
                // ======================================

                const fold3 =
                    Math.sin(
                        progress * 3.0 +
                        row * 0.025
                    ) *
                    20;


                // ======================================
                // SUBTLE FABRIC MOVEMENT
                // ======================================

                const fold4 =
                    Math.sin(
                        progress * 20 +
                        time * 0.00008 +
                        row * 0.09
                    ) *
                    3;


                // ======================================
                // MOUSE INFLUENCE
                // ======================================

                const dx =
                    x - mouse.x;

                const dy =
                    baseY - mouse.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                const influence =
                    Math.max(
                        0,
                        1 - distance / 450
                    );


                const mouseWave =
                    Math.sin(
                        dx * 0.015
                    ) *
                    influence *
                    18;


                // ======================================
                // FINAL Y
                // ======================================

                const y =
                    baseY +
                    fold1 +
                    fold2 +
                    fold3 +
                    fold4 +
                    mouseWave;


                if (i === 0) {

                    ctx.moveTo(x, y);

                } else {

                    ctx.lineTo(x, y);
                }
            }


            // ==================================================
            // COPPER LIGHT
            // ==================================================

            const verticalDistance =
                Math.abs(baseY - mouse.y);


            const glow =
                mouse.active
                    ? Math.max(
                        0,
                        1 - verticalDistance / 340
                    )
                    : 0;


            // Garis dasar sangat transparan
            const alpha =
                0.12 +
                glow * 0.04;

            ctx.strokeStyle =
                `rgba(
                    ${FABRIC.r},
                    ${FABRIC.g},
                    ${FABRIC.b},
                    ${alpha}
                )`;

            // Garis sangat tipis
            ctx.lineWidth =
                0.65 +
                glow * 0.5;

            // Soft glow
            ctx.shadowBlur =
                glow * 10;


            ctx.shadowColor =
                `rgba(
                    225,
                    155,
                    90,
                    ${glow * 0.28}
                )`;


            ctx.stroke();

            ctx.shadowBlur = 0;
        }
    }


    // ==================================================
    // SOFT COPPER LIGHT
    // ==================================================

    function drawMouseLight() {

        if (!mouse.active) return;


        const gradient =
            ctx.createRadialGradient(
                mouse.x,
                mouse.y,
                0,
                mouse.x,
                mouse.y,
                280
            );

        gradient.addColorStop(
            0,
            "rgba(225,155,90,0.055)"
        );

        gradient.addColorStop(
            0.40,
            "rgba(205,135,75,0.020)"
        );            

        gradient.addColorStop(
            1,
            "rgba(180,110,60,0)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            mouse.x - 280,
            mouse.y - 280,
            560,
            560
        );
    }


    // ==================================================
    // ANIMATION
    // ==================================================

    function animateServicesWave(time) {

        // Services tidak sedang terlihat
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


        // Fabric
        drawFabric(time);


        // Mouse light
        drawMouseLight();


        animationId =
            requestAnimationFrame(
                animateServicesWave
            );
    }



    // ==================================================
    // START
    // ==================================================

    resizeServicesCanvas();

    window.addEventListener(
        "resize",
        resizeServicesCanvas
    );

    // ==================================================
    // VISIBILITY CONTROL
    // ==================================================

    const servicesSection =
        document.getElementById("services");


    if (servicesSection) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    const entry = entries[0];

                    isVisible =
                        entry.isIntersecting;

                    // ======================================
                    // SERVICES AKTIF
                    // ======================================

                    if (isVisible) {

                        if (animationId === null) {

                            animationId =
                                requestAnimationFrame(
                                    animateServicesWave
                                );
                        }
                    }


                    // ======================================
                    // SERVICES TIDAK AKTIF
                    // ======================================

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


        observer.observe(
            servicesSection
        );
    }

    requestAnimationFrame(
        animateServicesWave
    );

}



