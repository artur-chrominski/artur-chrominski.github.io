import './scss/app.scss';
import './scss/customize.scss';

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.js-toggle-nav');
    const navMenu = document.querySelector('.c-header__mobile-menu');

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function () {
            this.classList.toggle('is-open'); 
            navMenu.classList.toggle('c-header__mobile-active'); 
        });
    }
});
