// Безпечне виконання коду після завантаження DOM
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Перевірка на існування обох елементів
    if (!btn || !menu) {
        console.warn('Hamburger menu elements not found');
        return;
    }

    btn.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Закриття меню при кліку на посилання
    menu.addEventListener('click', function(e) {
        // Перевірка чи клік був на посиланні
        if (e.target.tagName === 'A') {
            menu.classList.remove('active');
        }
    });

    // Закриття меню при кліку поза ним
    document.addEventListener('click', function(e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

// Основна функція toggle курсів з повними перевірками
function toggleCourse(element) {
    // Перевірка на існування головного елемента
    if (!element) {
        console.error('toggleCourse: element is null or undefined');
        return;
    }

    const button = element.querySelector('.course-header');
    if (!button) {
        console.error('toggleCourse: .course-header not found in element');
        return;
    }

    const isExpanded = element.classList.contains('expanded');

    // Закриття всіх інших курсів
    const allCourseItems = document.querySelectorAll('.course-item');
    if (allCourseItems.length > 0) {
        allCourseItems.forEach(item => {
            if (item !== element) {
                item.classList.remove('expanded');
                const btn = item.querySelector('.course-header');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // Переключення поточного курсу
    if (!isExpanded) {
        element.classList.add('expanded');
        button.setAttribute('aria-expanded', 'true');

        // Запобігання повторним скролам
        if (element.classList.contains('scrolling')) return;
        element.classList.add('scrolling');

        setTimeout(() => {
            // Додаткова перевірка що елемент все ще існує
            if (element && typeof element.scrollIntoView === 'function') {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
            if (element) {
                element.classList.remove('scrolling');
            }
        }, 400);
    } else {
        element.classList.remove('expanded');
        button.setAttribute('aria-expanded', 'false');
    }
}

// Ініціалізація обробників подій для курсів
function initializeCourseToggles() {
    const courseHeaders = document.querySelectorAll('.course-header');
    
    if (courseHeaders.length === 0) {
        console.warn('No course headers found');
        return;
    }

    // Додавання підтримки клавіатури для заголовків курсів
    courseHeaders.forEach(header => {
        if (!header) return;

        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const parentElement = this.parentElement;
                if (parentElement) {
                    toggleCourse(parentElement);
                }
            }
        });
    });

    // Запобігання toggle при кліку на CTA кнопки
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
}

// Ініціалізація плавного скролінгу
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks.length === 0) {
        console.warn('No anchor links found');
        return;
    }

    anchorLinks.forEach(anchor => {
        if (!anchor) return;

        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target && typeof target.scrollIntoView === 'function') {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.warn(`Target element not found: ${targetId}`);
            }
        });
    });
}

// Закриття розгорнутих курсів при кліку поза ними
function initializeClickOutside() {
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.course-item')) {
            const courseItems = document.querySelectorAll('.course-item');
            courseItems.forEach(item => {
                if (item) {
                    item.classList.remove('expanded');
                    const button = item.querySelector('.course-header');
                    if (button) {
                        button.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }
    });
}

// Ініціалізація підтримки дотику для мобільних
function initializeTouchSupport() {
    const courseItems = document.querySelectorAll('.course-item');
    
    if (courseItems.length === 0) {
        console.warn('No course items found for touch support');
        return;
    }

    courseItems.forEach(item => {
        if (!item) return;

        item.addEventListener('touchstart', function() {
            this.classList.add('touching');
        });

        item.addEventListener('touchend', function() {
            this.classList.remove('touching');
        });
    });
}

// Функція toggle для додаткових відгуків
function toggleMoreReviews() {
    const additionalReviews = document.querySelectorAll('.additional-review');
    const button = document.querySelector('.show-more-btn');
    
    // Перевірка на існування кнопки
    if (!button) {
        console.error('Show more button not found');
        return;
    }

    // Перевірка на існування додаткових відгуків
    if (additionalReviews.length === 0) {
        console.warn('No additional reviews found');
        return;
    }

    const isExpanded = button.classList.contains('expanded');

    if (!isExpanded) {
        // Показати додаткові відгуки
        additionalReviews.forEach((review, index) => {
            if (review) {
                setTimeout(() => {
                    review.classList.add('show');
                }, index * 100);
            }
        });
        button.classList.add('expanded');
        button.setAttribute('aria-expanded', 'true');
    } else {
        // Приховати додаткові відгуки
        additionalReviews.forEach((review) => {
            if (review) {
                review.classList.remove('show');
            }
        });
        button.classList.remove('expanded');
        button.setAttribute('aria-expanded', 'false');

        // Скрол до секції відгуків
        setTimeout(() => {
            const reviewsSection = document.getElementById('reviews');
            if (reviewsSection && typeof reviewsSection.scrollIntoView === 'function') {
                reviewsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
    }
}

// Ініціалізація кнопки "Показати більше відгуків"
function initializeShowMoreReviews() {
    const showMoreBtn = document.querySelector('.show-more-btn');
    
    if (!showMoreBtn) {
        console.warn('Show more reviews button not found');
        return;
    }

    // Підтримка клавіатури
    showMoreBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMoreReviews();
        }
    });
}

// Додавання класу loaded після завантаження
function addPageLoadedClass() {
    document.body.classList.add('loaded');
}

// Обробка помилок завантаження ресурсів
window.addEventListener('error', function(e) {
    console.error('Помилка завантаження ресурсу:', {
        filename: e.filename || 'Unknown',
        lineno: e.lineno || 'Unknown',
        message: e.message || 'Unknown error'
    });
});

// Моніторинг продуктивності
window.addEventListener('load', function() {
    if ('performance' in window && window.performance.timing) {
        try {
            const loadTime = Math.round(
                window.performance.timing.loadEventEnd - 
                window.performance.timing.navigationStart
            );
            console.log('Час завантаження сторінки:', loadTime + 'мс');
        } catch (error) {
            console.warn('Could not calculate page load time:', error);
        }
    }
});

// Глобальна функція для використання в HTML (onclick)
window.toggleCourse = toggleCourse;
window.toggleMoreReviews = toggleMoreReviews;

// Додаткові безпечні функції для роботи з DOM
const SafeDOM = {
    // Безпечний querySelector
    querySelector: function(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.error(`Error selecting element: ${selector}`, error);
            return null;
        }
    },

    // Безпечний querySelectorAll
    querySelectorAll: function(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.error(`Error selecting elements: ${selector}`, error);
            return [];
        }
    },

    // Безпечне додавання event listener
    addEventListener: function(element, event, handler) {
        if (element && typeof element.addEventListener === 'function') {
            try {
                element.addEventListener(event, handler);
                return true;
            } catch (error) {
                console.error(`Error adding event listener:`, error);
                return false;
            }
        }
        console.warn('Element is null or does not support addEventListener');
        return false;
    }
};

// Експорт для використання в інших скриптах (якщо потрібно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleCourse,
        toggleMoreReviews,
        SafeDOM
    };
}
