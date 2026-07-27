// Checks
console.log("App Status -- OK");

// Variables
const toggleMode = document.querySelector('.mode-toggle');
const revealBackground = document.querySelector('.mode-render');
const backgroundSection = document.getElementById('about__background');
const mainNav = document.querySelector('nav');
const miniNav = document.querySelector('.mini-nav');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        miniNav.classList.toggle('visible', !entry.isIntersecting);
    });
}, {
    threshold: 0,
    rootMargin: '-1px 0px 0px 0px' // trigger right as nav's bottom edge crosses viewport top
});

// Functions
toggleMode.addEventListener('click', () =>
{
    document.body.classList.toggle('dark-mode');
});

function initRevealTriggers() {
    document.querySelectorAll('[data-reveal-target]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.getElementById(trigger.dataset.revealTarget);
            if (!target) return;

            target.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                target.classList.add('expanded');
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 450);
            }, 50);
        });
    });
}

initRevealTriggers();
navObserver.observe(mainNav);

// Gallery Functions

function initGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    const track = gallery.querySelector('.gallery__track');
    const cards = Array.from(track.children);
    const prevBtn = gallery.querySelector('.gallery__btn--prev');
    const nextBtn = gallery.querySelector('.gallery__btn--next');

    let index = 0;

    function update() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    }

    function goTo(newIndex) {
        index = (newIndex + cards.length) % cards.length; // wraps around both directions
        update();
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));
    window.addEventListener('resize', update); // card width changes on resize/breakpoints

    update();
}

const galleryImages = [
    'img_1.jpeg', 'img_2.jpeg', 'img_3.jpeg', 'img_4.jpeg', 'img_5.jpeg', 'img_6.jpeg', 'img_7.jpeg', 'img_8.jpeg', 'img_9.jpeg',
    'img_10.jpeg', 'img_11.jpeg', 'img_12.jpeg', 'img_13.jpeg', 'img_14.jpeg', 'img_15.jpeg', 'img_16.jpeg', 'img_17.jpeg', 'img_18.jpeg',
    'img_19.jpeg', 'img_20.jpeg', 'img_21.jpeg',
];

function buildGalleryCards() {
    const track = document.querySelector('.gallery__track');
    if (!track) return;

    track.innerHTML = galleryImages.map(filename => `
            <figure class = "gallery__card">
                <img src="./assets/gallery/${filename}" alt="">
            </figure>
        `).join('');
}

buildGalleryCards();
initGallery();