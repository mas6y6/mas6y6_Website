// Top Nav
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav.nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navButtons = document.querySelector('.nav-buttons');

    if (navToggle && navButtons) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navButtons.classList.toggle('active');
        });

        // Close menu when clicking a button
        const buttons = navButtons.querySelectorAll('.nav-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navButtons.classList.remove('active');
            });
        });
    }
});
// Scroll effect

document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll(".scroll-on");

    console.log(scrollElements);

    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    };

    const displayScrollElement = (el) => {
        el.classList.add("scroll-on-active");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    window.addEventListener("DOMContentLoaded", handleScrollAnimation);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('social-discord').addEventListener('click', () => {
        window.open("https://discordapp.com/users/1165046623299174531")
    });

    document.getElementById('social-github').addEventListener('click', () => {
        window.open("https://github.com/mas6y6")
    });

    document.getElementById('social-youtube').addEventListener('click', () => {
        window.open("https://www.youtube.com/@mas6y6")
    });

    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })

    // People

    document.querySelector("#people-batista").addEventListener('click', () => {
        window.open("https://batistacakewalk.parafieldstudios.com/home");
    });

    document.querySelector("#people-st6").addEventListener('click', () => {
        window.open("https://technologicalshadows-home.carrd.co/")
    });

    document.querySelector("#people-malachi196").addEventListener('click', () => {
        window.open("https://discordapp.com/users/1166148454603571280");
    });

    document.querySelector("#people-mushy").addEventListener('click', () => {
        window.open("https://discordapp.com/users/1016878311005225032");
    });

    document.querySelector("#people-notdef").addEventListener('click', () => {
        window.open("https://discordapp.com/users/1278494594560032849");
    });
})