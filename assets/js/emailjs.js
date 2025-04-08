// Desert Sports Med - EmailJS Integration

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    // Replace 'YOUR_USER_ID' with your actual EmailJS user ID when you set up your account
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_USER_ID");
    } else {
        console.warn('EmailJS not loaded. Contact forms may not work properly.');
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate form
            if (!validateForm('contact-form')) {
                showErrorMessage('contact-form', 'Please fill in all required fields correctly.');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Prepare template parameters
            const templateParams = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                phone: contactForm.querySelector('input[name="phone"]').value,
                subject: contactForm.querySelector('input[name="subject"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value
            };

            // Send email using EmailJS
            emailjs.send('default_service', 'contact_form', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage('contact-form', 'Thank you for your message! We will get back to you soon.');
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showErrorMessage('contact-form', 'Failed to send message. Please try again or contact us directly.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });
        });
    }

    // Free intro form submission
    const introForm = document.getElementById('intro-form');
    if (introForm) {
        introForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate form
            if (!validateForm('intro-form')) {
                showErrorMessage('intro-form', 'Please fill in all required fields correctly.');
                return;
            }

            // Show loading state
            const submitButton = introForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Prepare template parameters
            const templateParams = {
                name: introForm.querySelector('input[name="name"]').value,
                email: introForm.querySelector('input[name="email"]').value,
                phone: introForm.querySelector('input[name="phone"]').value,
                interest: introForm.querySelector('select[name="interest"]').value,
                message: introForm.querySelector('textarea[name="message"]').value
            };

            // Send email using EmailJS
            emailjs.send('default_service', 'intro_form', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage('intro-form', 'Thank you for your interest! We will contact you shortly to schedule your free intro session.');
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showErrorMessage('intro-form', 'Failed to send request. Please try again or contact us directly.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });
        });
    }

    // Pricing inquiry form submission
    const pricingForm = document.getElementById('pricing-form');
    if (pricingForm) {
        pricingForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate form
            if (!validateForm('pricing-form')) {
                showErrorMessage('pricing-form', 'Please fill in all required fields correctly.');
                return;
            }

            // Show loading state
            const submitButton = pricingForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Prepare template parameters
            const templateParams = {
                name: pricingForm.querySelector('input[name="name"]').value,
                email: pricingForm.querySelector('input[name="email"]').value,
                phone: pricingForm.querySelector('input[name="phone"]').value,
                service: pricingForm.querySelector('select[name="service"]').value,
                message: pricingForm.querySelector('textarea[name="message"]').value
            };

            // Send email using EmailJS
            emailjs.send('default_service', 'pricing_form', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage('pricing-form', 'Thank you for your inquiry! We will send you detailed pricing information shortly.');
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showErrorMessage('pricing-form', 'Failed to send inquiry. Please try again or contact us directly.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });
        });
    }
});

// Form validation function
function validateForm(formId) {
    const form = document.getElementById(formId);

    if (!form) return false;

    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
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

        // Phone validation (optional)
        if (input.name === 'phone' && input.value.trim()) {
            const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (!phonePattern.test(input.value.trim())) {
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

    // Store the original form HTML
    const originalForm = form.innerHTML;

    // Clear the form and show success message
    form.innerHTML = '';
    form.appendChild(successMessage);

    // Reset form after 5 seconds (optional)
    setTimeout(() => {
        form.innerHTML = originalForm;

        // Reattach event listeners if needed
        if (formId === 'contact-form') {
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    // Re-implement form submission logic
                });
            }
        }
    }, 5000);
}

// Show error message
function showErrorMessage(formId, message) {
    const form = document.getElementById(formId);

    if (!form) return;

    // Remove existing error message if any
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message || 'There was an error submitting the form. Please try again.';

    // Insert at the top of the form
    form.insertBefore(errorMessage, form.firstChild);

    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}
