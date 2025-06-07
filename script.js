// Безпечне виконання коду після завантаження DOM
document.addEventListener('DOMContentLoaded', function () {
    initializeHamburgerMenu();
    initializeCourseToggles();
    initializeSmoothScrolling();
    initializeClickOutside();
    initializeTouchSupport();
    initializeShowMoreReviews();
    addPageLoadedClass();
});

// Ініціалізація hamburger меню
function initializeHamburgerMenu() {
    const btn = document.querySelector('.hamburger-btn');
    const menu = document.querySelector('.nav-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    menu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            menu.classList.remove('active');
        }
    });

    document.addEventListener('click', function (e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

// Основна функція toggle курсів
function toggleCourse(element) {
    if (!element) return;

    const button = element.querySelector('.course-header');
    if (!button) return;

    const isExpanded = element.classList.contains('expanded');

    const allCourseItems = document.querySelectorAll('.course-item');
    allCourseItems.forEach(item => {
        if (item !== element) {
            item.classList.remove('expanded');
            const btn = item.querySelector('.course-header');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }
    });

    if (!isExpanded) {
        element.classList.add('expanded');
        button.setAttribute('aria-expanded', 'true');

        if (element.classList.contains('scrolling')) return;
        element.classList.add('scrolling');

        setTimeout(() => {
            if (element.scrollIntoView) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            element.classList.remove('scrolling');
        }, 400);
    } else {
        element.classList.remove('expanded');
        button.setAttribute('aria-expanded', 'false');
    }
}

function initializeCourseToggles() {
    const courseHeaders = document.querySelectorAll('.course-header');

    courseHeaders.forEach(header => {
        header.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const parentElement = this.parentElement;
                if (parentElement) {
                    toggleCourse(parentElement);
                }
            }
        });
    });

    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });
}

function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target && target.scrollIntoView) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initializeClickOutside() {
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.course-item')) {
            const courseItems = document.querySelectorAll('.course-item');
            courseItems.forEach(item => {
                item.classList.remove('expanded');
                const button = item.querySelector('.course-header');
                if (button) {
                    button.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

// Додає клас .touching при дотику до .course-item 
function initializeTouchSupport() {
    const courseItems = document.querySelectorAll('.course-item');

    courseItems.forEach(item => {
        item.addEventListener('touchstart', function () {
            this.classList.add('touching');
        });

        item.addEventListener('touchend', function () {
            this.classList.remove('touching');
        });
    });
}

// Toggle для додаткових відгуків
function toggleMoreReviews() {
    const additionalReviews = document.querySelectorAll('.additional-review');
    const button = document.querySelector('.show-more-btn');
    if (!button || additionalReviews.length === 0) return;

    const isExpanded = button.classList.contains('expanded');

    if (!isExpanded) {
        additionalReviews.forEach((review, index) => {
            setTimeout(() => {
                review.classList.add('show');
            }, index * 100);
        });
        button.classList.add('expanded');
        button.setAttribute('aria-expanded', 'true');
    } else {
        additionalReviews.forEach(review => {
            review.classList.remove('show');
        });
        button.classList.remove('expanded');
        button.setAttribute('aria-expanded', 'false');

        setTimeout(() => {
            const reviewsSection = document.getElementById('reviews');
            if (reviewsSection && reviewsSection.scrollIntoView) {
                reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }
}
// Додає підтримку клавіш Enter і Space для кнопки "Показати більше"
function initializeShowMoreReviews() {
    const showMoreBtn = document.querySelector('.show-more-btn');
    if (!showMoreBtn) return;

    showMoreBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMoreReviews();
        }
    });
}

// Додає клас .loaded до body — можна використати для анімації або переходів після завантаження
function addPageLoadedClass() {
    document.body.classList.add('loaded');
}

// Глобальні функції для HTML
window.toggleCourse = toggleCourse;
window.toggleMoreReviews = toggleMoreReviews;
