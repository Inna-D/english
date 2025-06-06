document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.hamburger-btn');
    const menu = document.querySelector('.nav-menu');

    btn.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Close menu when clicking on links
    menu.addEventListener('click', function() {
        menu.classList.remove('active');
    });
});
  
  
  function toggleCourse(element) {
    const isExpanded = element.classList.contains('expanded');
    const button = element.querySelector('.course-header');
    if (!button) return;

    // Close all other courses
    document.querySelectorAll('.course-item').forEach(item => {
        item.classList.remove('expanded');
        const btn = item.querySelector('.course-header');
        if (btn) {
            btn.setAttribute('aria-expanded', 'false');
        }
    });

    // Toggle current course
    if (!isExpanded) {
        element.classList.add('expanded');
        button.setAttribute('aria-expanded', 'true');

        // Prevent repeated scrolls
        if (element.classList.contains('scrolling')) return;
        element.classList.add('scrolling');

        setTimeout(() => {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
            element.classList.remove('scrolling');
        }, 300);
    }
}

// Add keyboard support for course headers
document.querySelectorAll('.course-header').forEach(header => {
    header.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCourse(this.parentElement);
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close expanded courses when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.course-item')) {
        document.querySelectorAll('.course-item').forEach(item => {
            item.classList.remove('expanded');
            const button = item.querySelector('.course-header');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Prevent course toggle when clicking on CTA button
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Add touch support for mobile
document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('touchstart', function() {
        this.classList.add('touching');
    });

    item.addEventListener('touchend', function() {
        this.classList.remove('touching');
    });
});

// Error handling for network requests
window.addEventListener('error', function(e) {
    console.error('Помилка завантаження ресурсу:', e.filename, e.lineno, e.message);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = Math.round(window.performance.timing.loadEventEnd - window.performance.timing.navigationStart);
        console.log('Час завантаження сторінки:', loadTime + 'мс');
    }
});

// Add loading states for better UX
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Toggle more reviews functionality
function toggleMoreReviews() {
    const additionalReviews = document.querySelectorAll('.additional-review');
    const button = document.querySelector('.show-more-btn');
    if (!button) return;

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
        additionalReviews.forEach((review) => {
            review.classList.remove('show');
        });
        button.classList.remove('expanded');
        button.setAttribute('aria-expanded', 'false');

        setTimeout(() => {
            document.getElementById('reviews').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

// Keyboard support for show more button
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.querySelector('.show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMoreReviews();
            }
        });
    }
});
