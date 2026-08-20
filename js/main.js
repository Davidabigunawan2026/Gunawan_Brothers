/* ==================================================
   PREMIUM CURSOR
================================================== */

const cursor = document.querySelector(".cursor");
const threadPath = document.querySelector("#threadPath");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const points = [];
const POINT_COUNT = 18;

/* Buat titik benang */

for (let i = 0; i < POINT_COUNT; i++) {

    points.push({
        x: 0,
        y: 0
    });

}


/* ==================================================
   MOUSE MOVE
================================================== */

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


/* ==================================================
   ANIMATE  CURSOR
================================================== */

function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;


    /* Cursor */
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";


    /* Benang */
    points[0].x = cursorX;
    points[0].y = cursorY;


    for (let i = 1; i < POINT_COUNT; i++) {

        points[i].x +=
            (points[i - 1].x - points[i].x) * 0.18;

        points[i].y +=
            (points[i - 1].y - points[i].y) * 0.18;

    }


    let path =
        `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < POINT_COUNT; i++) {

        const p = points[i - 1];
        const c = points[i];
        const x = (p.x + c.x) / 2;
        const y = (p.y + c.y) / 2;
        path +=
            ` Q ${p.x} ${p.y} ${x} ${y}`;

    }

    threadPath.setAttribute("d", path);

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* ==================================================
   ACTIVE NAVIGATION
================================================== */

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});


/* ==================================================
   AMBIENT SOUND
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const audio =
        document.getElementById("ambientAudio");

    const button =
        document.getElementById("ambientToggle");


    /* ==============================================
       INITIAL VOLUME
    ============================================== */

    audio.volume = 0.18;

    
    /* ==============================================
       PLAY / PAUSE
    ============================================== */

    button.addEventListener("click", function () {

        if (audio.paused) {

            audio.play();
            button.textContent = "Ⅱ";
            button.classList.add("playing");
            button.setAttribute(
                "aria-label",
                "Pause ambient sound"
            );

        } else {

            audio.pause();
            button.textContent = "▶";
            button.classList.remove(
                "playing"
            );

            button.setAttribute(
                "aria-label",
                "Play ambient sound"
            );

        }

    });

});



