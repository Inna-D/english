// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Animate hamburger menu
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    // Додаємо плавне прокручування для навігаційних посилань
document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо всі посилання в навігаційному меню
    const navLinks = document.querySelectorAll('#nav-menu a');
    
    // Додаємо обробник події до кожного посилання
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Отримуємо цільовий елемент (без символу #)
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            // Якщо цільовий елемент існує
            if (targetElement) {
                // Запобігаємо стандартній поведінці посилання
                e.preventDefault();
                
                // Плавно прокручуємо до цільового елемента
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Закриваємо мобільне меню, якщо воно відкрите
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    document.getElementById('mobile-toggle').classList.remove('active');
                }
            }
        });
    });
    
    // Додаємо обробник для кнопки мобільного меню
    const mobileToggle = document.getElementById('mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // Додаємо активний клас до поточного пункту меню при прокручуванні
    function setActiveNavItem() {
        // Отримуємо всі секції, на які можна перейти через меню
        const sections = document.querySelectorAll('section[id]');
        
        // Визначаємо поточну позицію прокрутки
        const scrollPosition = window.scrollY + 100; // З невеликим відступом
        
        // Перевіряємо кожну секцію
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Якщо користувач прокрутив до цієї секції
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Видаляємо активний клас з усіх пунктів меню
                document.querySelectorAll('#nav-menu a').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Додаємо активний клас до відповідного пункту меню
                document.querySelector(`#nav-menu a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // Запускаємо функцію при прокручуванні сторінки
    window.addEventListener('scroll', setActiveNavItem);
    
    // Викликаємо функцію відразу для встановлення початкового активного пункту
    setActiveNavItem();
});

    // Duplicate ticker items for seamless scrolling
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        const tickerItems = ticker.querySelectorAll('.ticker-item');
        tickerItems.forEach(item => {
            const clone = item.cloneNode(true);
            ticker.appendChild(clone);
        });
    }
    
    // Initialize feature cards animation
    initFeatureCards();
});

// Initialize feature cards animation
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Add animation to hero elements on load
window.addEventListener('load', function() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.style.animation = 'fadeInUp 1s ease-out';
    }
    
    if (heroImage) {
        heroImage.style.animation = 'fadeInRight 1s ease-out 0.3s both';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-toggle');
    
    if (navMenu && mobileToggle) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = mobileToggle.contains(event.target);
        
        if (navMenu.classList.contains('show') && !isClickInsideNav && !isClickOnToggle) {
            navMenu.classList.remove('show');
            mobileToggle.classList.remove('active');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-toggle');
    
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('show');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
        }
    }
});
// Додаємо обробники подій після повного завантаження документа
document.addEventListener('DOMContentLoaded', function() {
    // Функціонал табів
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Видаляємо активний клас з усіх кнопок та контенту
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Додаємо активний клас до натиснутої кнопки
            button.classList.add('active');
            
            // Показуємо відповідний контент
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Функціонал акордеону
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Отримуємо батьківський елемент (accordion-item)
            const accordionItem = header.parentElement;
            
            // Перевіряємо, чи елемент уже активний
            const isActive = accordionItem.classList.contains('active');
            
            // Якщо потрібно тільки один відкритий елемент одночасно, закриваємо всі
            // Розкоментуйте цей блок, якщо потрібно такий функціонал
            /*
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
            });
            */
            
            // Перемикаємо активний стан для поточного елемента
            if (isActive) {
                accordionItem.classList.remove('active');
                header.querySelector('.accordion-icon').textContent = '+';
            } else {
                accordionItem.classList.add('active');
                header.querySelector('.accordion-icon').textContent = '+';
            }
        });
    });
    
    // Обробник для кнопок "Дізнатися більше"
    const courseButtons = document.querySelectorAll('.primary-button');
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Отримуємо текст батьківського заголовка курсу
            const courseCard = this.closest('.course-card');
            let targetAccordion;
            
            if (courseCard.classList.contains('card-pronunciation')) {
                targetAccordion = document.getElementById('pronunciation-program');
                window.location.href = '#pronunciation-program';
            } else if (courseCard.classList.contains('card-movie')) {
                targetAccordion = document.getElementById('movie-club-program');
                window.location.href = '#movie-club-program';
            }
            
            // Активуємо вкладку "Курси" і відкриваємо відповідний акордеон
            if (targetAccordion) {
                // Активуємо вкладку Курси
                document.querySelector('.tab-btn[data-tab="courses"]').click();
                
                // Відкриваємо відповідний акордеон, якщо він закритий
                if (!targetAccordion.classList.contains('active')) {
                    targetAccordion.classList.add('active');
                    targetAccordion.querySelector('.accordion-icon').textContent = '+';
                }
                
                // Прокручуємо до елемента з невеликою затримкою для анімації
                setTimeout(() => {
                    targetAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
    
    // Якщо у URL є хеш з ID акордеону, відкриваємо його автоматично
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetAccordion = document.getElementById(targetId);
        
        if (targetAccordion && targetAccordion.classList.contains('accordion-item')) {
            // Активуємо вкладку Курси
            document.querySelector('.tab-btn[data-tab="courses"]').click();
            
            // Відкриваємо акордеон
            targetAccordion.classList.add('active');
            targetAccordion.querySelector('.accordion-icon').textContent = '+';
            
            // Прокручуємо до елемента
            setTimeout(() => {
                targetAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});

// Оновлення посилань у навігаційному меню
document.addEventListener('DOMContentLoaded', function() {
    // Додаємо обробник для курсових кнопок в секції курсів
    const updateCourseLinks = function() {
        // Отримуємо всі кнопки "Дізнатися більше" з секції курсів
        const courseButtons = document.querySelectorAll('.course-action .primary-button');
        
        courseButtons.forEach(button => {
            const courseCard = button.closest('.course-card');
            
            if (courseCard.classList.contains('card-pronunciation')) {
                button.setAttribute('href', '#pronunciation-program');
            } else if (courseCard.classList.contains('card-movie')) {
                button.setAttribute('href', '#movie-club-program');
            }
        });
    };
    
    // Викликаємо функцію оновлення посилань
    updateCourseLinks();
});
// Функціонал для показу/приховування додаткових відгуків
document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо посилання на елементи
    const showMoreButton = document.getElementById('show-more-reviews');
    const showLessButton = document.getElementById('show-less-reviews');
    const additionalTestimonials = document.getElementById('additional-testimonials');
    
    // Обробник події для кнопки "Переглянути більше відгуків"
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function(e) {
            e.preventDefault(); // Запобігаємо стандартній дії посилання
            
            // Показуємо додаткові відгуки
            additionalTestimonials.classList.remove('hidden');
            
            // Додаємо клас для анімації до кожної картки відгуку
            const testimonialCards = additionalTestimonials.querySelectorAll('.testimonial-card');
            testimonialCards.forEach(card => {
                card.classList.add('new-review');
            });
            
            // Приховуємо кнопку "Показати більше" і показуємо "Згорнути"
            showMoreButton.classList.add('hidden');
            showLessButton.classList.remove('hidden');
            
            // Прокручуємо до першого нового відгуку
            setTimeout(() => {
                testimonialCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    }
    
    // Обробник події для кнопки "Згорнути відгуки"
    if (showLessButton) {
        showLessButton.addEventListener('click', function(e) {
            e.preventDefault(); // Запобігаємо стандартній дії посилання
            
            // Приховуємо додаткові відгуки
            additionalTestimonials.classList.add('hidden');
            
            // Приховуємо кнопку "Згорнути" і показуємо "Показати більше"
            showLessButton.classList.add('hidden');
            showMoreButton.classList.remove('hidden');
            
            // Прокручуємо до секції відгуків
            const testimonialSection = document.getElementById('testimonials');
            if (testimonialSection) {
                testimonialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Видаляємо клас анімації з карток
            const testimonialCards = additionalTestimonials.querySelectorAll('.testimonial-card');
            testimonialCards.forEach(card => {
                card.classList.remove('new-review');
            });
        });
    }
});