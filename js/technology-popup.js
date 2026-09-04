/* ==================================================
   TECHNOLOGY POPUP / MODAL
================================================== */


/* ==============================================
   TECHNOLOGY DATA
============================================== */

const technologyInfo = {

    html: {
        title: "HTML5",
        label: "FRONT END",
        icon: "images/tech/html5.png",
        description:
            "HTML5 provides the structure and semantic foundation of modern web applications. It defines the content, layout, and meaning of elements used to create accessible and well-structured web pages."
    },

    css: {
        title: "CSS3",
        label: "FRONT END",
        icon: "images/tech/css3.png",
        description:
            "CSS3 is used to control the visual presentation of web applications. It enables responsive layouts, animations, transitions, modern interfaces, and consistent styling across different devices."
    },

    js: {
        title: "JavaScript",
        label: "FRONT END",
        icon: "images/tech/javascript.png",
        description:
            "JavaScript adds logic and interactivity to web applications. It enables dynamic interfaces, event handling, asynchronous operations, API communication, and modern application behavior."
    },

    react: {
        title: "React",
        label: "FRONT END",
        icon: "images/tech/react.png",
        description:
            "React is a JavaScript library for building modern user interfaces using reusable components. It helps create responsive, maintainable, and interactive applications with efficient state-driven rendering."
    },

    jsx: {
        title: "JSX",
        label: "FRONT END",
        icon: "images/tech/jsx.png",
        description:
            "JSX is a syntax extension commonly used with React. It allows developers to describe UI structures using a syntax that combines JavaScript logic with HTML-like elements."
    },

    vue: {
        title: "Vue.js",
        label: "FRONT END",
        icon: "images/tech/vue.png",
        description:
            "Vue.js is a progressive JavaScript framework for building interactive user interfaces and web applications. Its component-based architecture makes applications easier to develop and maintain."
    },


    nodejs: {
        title: "Node.js",
        label: "BACK END",
        icon: "images/tech/nodejs.png",
        description:
            "Node.js is a JavaScript runtime that allows JavaScript to run on the server. It is commonly used to build APIs, backend services, real-time applications, and scalable web systems."
    },

    express: {
        title: "Express.js",
        label: "BACK END",
        icon: "images/tech/express.png",
        description:
            "Express.js is a lightweight Node.js framework for building web servers and REST APIs. It provides routing, middleware, request handling, and other tools for developing backend applications."
    },

    python: {
        title: "Python",
        label: "BACK END",
        icon: "images/tech/python.png",
        description:
            "Python is a versatile programming language widely used for backend development, automation, data processing, artificial intelligence, and API development."
    },

    restapi: {
        title: "REST API",
        label: "BACK END",
        icon: "images/tech/rest-api.png",
        description:
            "REST APIs provide a standard way for applications to communicate over HTTP. They allow frontend applications and backend services to exchange data using methods such as GET, POST, PUT, and DELETE."
    },


    sqlite: {
        title: "SQLite",
        label: "DATABASE",
        icon: "images/tech/sqlite.png",
        description:
            "SQLite is a lightweight relational database stored directly in a local file. It is useful for desktop applications, mobile applications, prototypes, and systems that do not require a separate database server."
    },

    mysql: {
        title: "MySQL",
        label: "DATABASE",
        icon: "images/tech/mysql.png",
        description:
            "MySQL is a popular relational database management system used to store and manage structured application data. It is widely used for web applications and business systems."
    },

    postgre: {
        title: "PostgreSQL",
        label: "DATABASE",
        icon: "images/tech/postgresql.png",
        description:
            "PostgreSQL is a powerful open-source relational database known for reliability, advanced SQL capabilities, data integrity, and support for complex applications."
    },


    git: {
        title: "Git",
        label: "TOOLS & CMS",
        icon: "images/tech/git.png",
        description:
            "Git is a distributed version control system used to track source-code changes. It allows developers to create branches, manage versions, collaborate, and safely maintain application history."
    },

    github: {
        title: "GitHub",
        label: "TOOLS & CMS",
        icon: "images/tech/github.png",
        description:
            "GitHub is a platform for hosting Git repositories and collaborating on software projects. It supports pull requests, code reviews, issue tracking, and modern development workflows."
    },

    vscode: {
        title: "VS Code",
        label: "TOOLS & CMS",
        icon: "images/tech/vscode.png",
        description:
            "Visual Studio Code is a modern source-code editor with extensive support for JavaScript, TypeScript, Python, Git, debugging, extensions, and many other development technologies."
    },

    npm: {
        title: "npm",
        label: "TOOLS & CMS",
        icon: "images/tech/npm.png",
        description:
            "npm is the package manager for the JavaScript ecosystem. It allows developers to install, manage, update, and share reusable libraries and dependencies for their applications."
    },

    wordpress: {
        title: "WordPress",
        label: "TOOLS & CMS",
        icon: "images/tech/wordpress.png",
        description:
            "WordPress is a widely used content management system for creating websites and digital experiences. It provides themes, plugins, and an extensible platform for managing web content."
    }

};


/* ==============================================
   GET POPUP ELEMENTS
============================================== */

const technologyModal =
    document.querySelector(".technology-modal");

const technologyModalIcon =
    document.querySelector(".technology-modal-icon");

const technologyModalTitle =
    document.querySelector(".technology-modal-title");

const technologyModalDescription =
    document.querySelector(".technology-modal-description");

const technologyModalLabel =
    document.querySelector(".technology-modal-label");

const technologyModalClose =
    document.querySelector(".technology-modal-close");


/* ==============================================
   TECHNOLOGY CARDS
============================================== */

const technologyCards =
    document.querySelectorAll(".technology-card");


/* ==============================================
   OPEN TECHNOLOGY POPUP
============================================== */

technologyCards.forEach(card => {

    card.addEventListener("click", () => {

        const techName =
            card.dataset.tech;

        const tech =
            technologyInfo[techName];

        if (!tech) {
            return;
        }


        /* Fill popup content */

        technologyModalIcon.src =
            tech.icon;

        technologyModalIcon.alt =
            tech.title;

        technologyModalTitle.textContent =
            tech.title;

        technologyModalDescription.textContent =
            tech.description;

        technologyModalLabel.textContent =
            tech.label;


        /* Show popup */

        technologyModal.classList.add("active");

    });

});


/* ==============================================
   CLOSE POPUP
============================================== */

technologyModalClose.addEventListener("click", () => {

    technologyModal.classList.remove("active");

});


/* ==============================================
   CLOSE WHEN CLICKING OUTSIDE
============================================== */

technologyModal.addEventListener("click", event => {

    if (event.target === technologyModal) {

        technologyModal.classList.remove("active");

    }

});


/* ==============================================
   CLOSE WITH ESC KEY
============================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        technologyModal.classList.remove("active");

    }

});

