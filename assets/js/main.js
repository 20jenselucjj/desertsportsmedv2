// Desert Sports Med - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header scroll effect
    initHeaderScroll();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize smooth scrolling for anchor links
    initSmoothScroll();

    // Initialize programs section animations
    initProgramsAnimations();
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active'); // Toggle active class for animation
            document.body.classList.toggle('menu-open');
        });

        // Handle dropdown menus on mobile
        if (dropdowns.length > 0) {
            // For mobile: add click event to dropdown items
            const mediaQuery = window.matchMedia('(max-width: 991px)');

            function handleMobileDropdowns(e) {
                if (e.matches) {
                    dropdowns.forEach(dropdown => {
                        const link = dropdown.querySelector('a');
                        const submenu = dropdown.querySelector('.dropdown-menu');
                        const dropdownItems = submenu.querySelectorAll('a');

                        // Remove existing event listeners first
                        link.removeEventListener('click', toggleDropdown);

                        // Add new event listener
                        link.addEventListener('click', toggleDropdown);

                        function toggleDropdown(event) {
                            event.preventDefault();
                            event.stopPropagation(); // Prevent event from bubbling up
                            submenu.classList.toggle('show');
                            dropdown.classList.toggle('active');
                        }

                        // Make sure dropdown menu items are clickable
                        dropdownItems.forEach(item => {
                            item.addEventListener('click', function(e) {
                                // Allow the link to work normally
                                // The menu will be closed by the navLinks event listener
                                e.stopPropagation();
                            });
                        });
                    });
                } else {
                    // Remove mobile event listeners when on desktop
                    dropdowns.forEach(dropdown => {
                        const link = dropdown.querySelector('a');
                        link.removeEventListener('click', function(){});
                    });
                }
            }

            // Initial check
            handleMobileDropdowns(mediaQuery);

            // Add listener for screen size changes
            mediaQuery.addEventListener('change', handleMobileDropdowns);
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-toggle')) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active'); // Remove active class for animation
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Close menu when clicking on a menu item (for mobile)
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Don't close menu if this is a dropdown toggle
                if (link.parentElement.classList.contains('dropdown') &&
                    !link.closest('.dropdown-menu')) {
                    // This is a dropdown parent link, don't close the menu
                    return;
                }

                // Close menu for regular links and dropdown menu items
                if (window.innerWidth < 992) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active'); // Remove active class for animation
                    document.body.classList.remove('menu-open');
                }
            });
        });

        // Initialize hamburger icon structure
        initHamburgerIcon();
    }
}

// Initialize hamburger icon structure
function initHamburgerIcon() {
    const mobileToggles = document.querySelectorAll('.mobile-toggle');

    mobileToggles.forEach(toggle => {
        // Make sure we have the right icon
        let icon = toggle.querySelector('i');

        // If no icon exists, create one
        if (!icon) {
            icon = document.createElement('i');
            toggle.innerHTML = ''; // Clear any existing content
            toggle.appendChild(icon);
        }

        // Ensure the icon is using the bars class
        icon.className = 'fas fa-bars';

        // Add click event to toggle between bars and times icons with animation
        toggle.addEventListener('click', function(e) {
            // Prevent default behavior
            e.stopPropagation();

            // Toggle the icon
            if (icon.classList.contains('fa-bars')) {
                // First remove the icon to reset animation
                icon.style.display = 'none';
                setTimeout(() => {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    icon.style.display = 'inline-block';
                }, 10);
            } else {
                // First remove the icon to reset animation
                icon.style.display = 'none';
                setTimeout(() => {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.style.display = 'inline-block';
                }, 10);
            }
        });

        // Add event listeners to close menu and reset icon
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-toggle')) {
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    toggle.classList.remove('active');

                    // Reset icon with animation
                    if (icon.classList.contains('fa-times')) {
                        icon.style.display = 'none';
                        setTimeout(() => {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                            icon.style.display = 'inline-block';
                        }, 10);
                    }

                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonials slider (if needed)
function initTestimonialsSlider() {
    // Implementation would depend on whether you want to use a library or custom code
    // This is a placeholder for future implementation
}

// Animation on scroll (if needed)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate');

    if (animatedElements.length > 0) {
        const checkIfInView = () => {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', checkIfInView);
        checkIfInView(); // Check on initial load
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);

    if (!form) return false;

    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });

    return isValid;
}

// Show success message
function showSuccessMessage(formId, message) {
    const form = document.getElementById(formId);

    if (!form) return;

    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message || 'Form submitted successfully!';

    form.innerHTML = '';
    form.appendChild(successMessage);
}

// Show error message
function showErrorMessage(formId, message) {
    const form = document.getElementById(formId);

    if (!form) return;

    const errorContainer = form.querySelector('.error-message') || document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.textContent = message || 'There was an error submitting the form. Please try again.';

    if (!form.querySelector('.error-message')) {
        form.prepend(errorContainer);
    }
}

// Programs section animations
function initProgramsAnimations() {
    const programItems = document.querySelectorAll('.modern-program-item');

    if (programItems.length === 0) return;

    // Reset animations initially
    programItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on item index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 300);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe each program item
    programItems.forEach(item => {
        observer.observe(item);
    });

    // Add hover effects
    programItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            const number = item.querySelector('.program-number');

            if (img) img.style.transform = 'scale(1.05)';
            if (number) {
                number.style.transform = 'translateY(-5px) translateX(-5px)';
                number.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            const number = item.querySelector('.program-number');

            if (img) img.style.transform = 'scale(1)';
            if (number) {
                number.style.transform = 'translateY(0) translateX(0)';
                number.style.boxShadow = 'none';
            }
        });
    });
}
