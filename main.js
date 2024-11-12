(function() {
    // Preloader
    window.onload = function () {
        setTimeout(fadeout, 500);
    };

    function fadeout() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
    }

    // Sticky Navbar and Back to Top Button
    const headerNavbar = document.querySelector(".navbar-area");
    const backToTop = document.querySelector(".scroll-top");

    window.onscroll = function () {
        const sticky = headerNavbar.offsetTop;
        headerNavbar.classList.toggle("sticky", window.pageYOffset > sticky);
        backToTop.style.display = (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) ? "flex" : "none";
    };

    // Smooth Scroll for Navbar Links
    const pageLinks = document.querySelectorAll('.page-scroll');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Cambiado para tener más control sobre el desplazamiento
            });
        });
    });

    // Close Navbar Collapse on Link Click
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    pageLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove('show');
        });
    });

    navbarToggler.addEventListener('click', () => {
        navbarToggler.classList.toggle("active");
    });

    // WOW.js Initialization
    new WOW().init();

    // Counter Up Initialization
    const cu = new counterUp({
        start: 0,
        duration: 2000,
        intvalues: true,
        interval: 100,
        append: " ",
    });
    cu.start();
})();

// Carrusel de tarjetas
const track = document.querySelector('.carousel-track');
const leftButton = document.querySelector('.carousel-button.left');
const rightButton = document.querySelector('.carousel-button.right');

let currentIndex = 0;

function updateCarousel() {
    // En dispositivos móviles, ajusta el tamaño de las tarjetas (por ejemplo, se asume un único item visible a la vez)
    const cardWidth = document.querySelector('.header-card').offsetWidth;
    const totalCards = document.querySelectorAll('.header-card').length;

    // Mueve el carrusel al índice actual
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

    // Asegúrate de que el carrusel no se mueva más allá de la última tarjeta
    const maxIndex = totalCards - 1;
    
    // Oculta la flecha izquierda si estamos en la primera tarjeta
    leftButton.style.display = currentIndex === 0 ? 'none' : 'flex';
  
    // Oculta la flecha derecha si estamos en la última tarjeta
    rightButton.style.display = currentIndex === 5 ? 'none' : 'flex';
}

// Funciones para mover el carrusel hacia la izquierda o hacia la derecha
leftButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

rightButton.addEventListener('click', () => {
    const totalCards = document.querySelectorAll('.header-card').length;
    if (currentIndex < totalCards - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Inicializa el carrusel y las flechas al cargar
updateCarousel();

// Opcional: ajusta la visibilidad de las flechas para pantallas pequeñas si es necesario
window.addEventListener('resize', () => {
    updateCarousel();
});
