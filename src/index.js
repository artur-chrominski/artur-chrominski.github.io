import './scss/app.scss';
import './scss/customize.scss';
import LocomotiveScroll from 'locomotive-scroll';

const scrollContainer = document.querySelector('[data-scroll-container]');

if (scrollContainer) {
    const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        smoothMobile: true,
        getDirection: true,
        inertia: 0.4
    });

    let debounceTimeoutId;

    scroll.on('scroll', (args) => {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(() => {
            if (args.scroll.y > 100) {
                document.body.classList.add('is-page-scrolled');
            } else {
                document.body.classList.remove('is-page-scrolled');
            }
        }, 100);
    });
}

function loadHTML(url, containerId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById(containerId).innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}
(async () => {    
    loadHTML('/design/elements/hero.html', 'hero-section');
    loadHTML('/design/elements/card.html', 'card-section');
    loadHTML('/design/elements/footer.html', 'footer-section');
})();


(async () => {
    const toggleButton = document.querySelector('.js-toggle-nav');
    const navMenu = document.querySelector('.c-header__mobile-menu');

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function () {
            this.classList.toggle('is-open');
            navMenu.classList.toggle('c-header__mobile-active');
        });
    }
})();
