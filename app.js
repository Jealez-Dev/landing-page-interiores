document.addEventListener('DOMContentLoaded', function () {

    /* Transformar nav static en un nav fixed */
    const nav = document.querySelector('.nav-bar');
    const header = document.querySelector('header');
    const navHeight = nav.offsetHeight;
    const navLinks = document.querySelectorAll('.nav-li a');

    window.addEventListener('scroll', function () {
        if (window.scrollY > navHeight) {
            nav.classList.add('nav-bar-top');
            navLinks.forEach(link => {
                link.style.color = 'var(--secondary-color)';
            });
        } else {
            nav.classList.remove('nav-bar-top');
            navLinks.forEach(link => {
                link.style.color = 'var(--text-color)';
            });

        }
    });

    /* Eventos de los links cuando pasa por una section*/
    const sections = document.querySelectorAll('section');

    /* Aprendi nuevo concepto IntersectionObserver */

    /*  opciones para controlar el obsevador */
    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Ejemplo: Centra la intersección en el medio de la pantalla
        threshold: 0 // Dispara cuando cualquier parte toca el centro.
    };
    const observer = new IntersectionObserver(handleIntersect, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    /** Eventos de los inputs **/
    const focus = document.querySelectorAll('input');
    const label = document.querySelectorAll('label');

    focus.forEach(input => {
        input.addEventListener('focus', function () {
            let id = input.id;
            label.forEach(label => {
                if (label.htmlFor === id) {
                    label.style.display = 'none';
                }
            });

        });
    });

    focus.forEach(input => {
        input.addEventListener('blur', function () {
            let id = input.id;
            label.forEach(label => {
                if (label.htmlFor === id) {
                    if (input.value === '') {
                        label.style.display = 'block';
                    }
                }
            });
        });
    });

    changeIMGCarousel();

});

function handleIntersect(entries) {
    entries.forEach(entry => {

        let nav = document.querySelector('.nav-bar-top');
        let section_id = entry.target.id;

        console.log(section_id);

        let link = document.querySelector(`a[href="#${section_id}"]`);

        if (entry.isIntersecting) {
            (link) ? link.style.fontWeight = 'bold' : null;
            console.log(link);
        } else {
            (link) ? link.style.fontWeight = 'normal' : null;
        }
    });
}

function changeIMGCarousel() {
    let time = 10000;
    const img1 = document.querySelector('.img1')
    const img2 = document.querySelector('.img2')

    setTimeout(() => {
        img1.style.transition = "margin-left 1s ease-in-out";
        img1.style.marginLeft = "150px";

        img2.style.transition = "margin-left 1s ease-in-out";
        img2.style.marginLeft = "-150px";

    }, time * 0.9);

    setTimeout(() => {
        img1.style.marginLeft = "50px";
        img1.style.transition = "margin-left 1s ease-in-out";

        img2.style.marginLeft = "0px";
        img2.style.transition = "margin-left 1s ease-in-out";

        if (img1.style.zIndex === "0") {
            img1.style.zIndex = "1";
            img2.style.zIndex = "0";
        } else {
            img1.style.zIndex = "0";
            img2.style.zIndex = "1";
        }
        changeIMGCarousel();
    }, time);

}

