// Desert Sports Med - Card Text Visibility Fix

document.addEventListener('DOMContentLoaded', function() {
    // Fix for component cards in light-bg sections
    const componentCards = document.querySelectorAll('.light-bg .component-card');
    componentCards.forEach(card => {
        // Ensure dark background
        card.style.backgroundColor = 'rgba(30, 30, 30, 0.8)';

        // Fix text colors
        const headings = card.querySelectorAll('h3, h4');
        headings.forEach(heading => {
            heading.style.color = '#ffffff';
        });

        const paragraphs = card.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            paragraph.style.color = '#ffffff';
        });

        const listItems = card.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.color = '#ffffff';
        });
    });

    // Fix for benefit cards in light-bg sections
    const benefitCards = document.querySelectorAll('.light-bg .benefit-card');
    benefitCards.forEach(card => {
        // Ensure dark background
        card.style.backgroundColor = 'rgba(30, 30, 30, 0.8)';

        // Fix text colors
        const headings = card.querySelectorAll('h3, h4');
        headings.forEach(heading => {
            heading.style.color = '#ffffff';
        });

        const paragraphs = card.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            paragraph.style.color = '#ffffff';
        });
    });

    // Fix for approach cards in light-bg sections
    const approachCards = document.querySelectorAll('.light-bg .approach-card');
    approachCards.forEach(card => {
        // Ensure dark background
        card.style.backgroundColor = 'rgba(30, 30, 30, 0.8)';

        // Fix text colors
        const headings = card.querySelectorAll('h3');
        headings.forEach(heading => {
            heading.style.color = '#ffffff';
        });

        const paragraphs = card.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            paragraph.style.color = '#ffffff';
        });
    });

    // Fix for team-type-card and event-type-card in light-bg sections
    const typeCards = document.querySelectorAll('.light-bg .team-type-card, .light-bg .event-type-card');
    typeCards.forEach(card => {
        // Ensure dark background
        card.style.backgroundColor = 'rgba(30, 30, 30, 0.8)';

        // Fix text colors
        const headings = card.querySelectorAll('h3');
        headings.forEach(heading => {
            heading.style.color = '#ffffff';
        });

        const paragraphs = card.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            paragraph.style.color = '#ffffff';
        });
    });

    // Fix for section titles in light-bg.dark-bg sections
    const darkBgSectionTitles = document.querySelectorAll('.light-bg.dark-bg .section-title h2, .section.light-bg.dark-bg .section-title h2');
    darkBgSectionTitles.forEach(title => {
        title.style.color = '#ffffff';
    });

    // Fix for process steps in event coverage page
    const processSteps = document.querySelectorAll('.process-steps .process-step');
    processSteps.forEach(step => {
        const heading = step.querySelector('.process-step-content h3');
        const paragraph = step.querySelector('.process-step-content p');

        if (heading) {
            heading.style.color = '#ffffff';
        }

        if (paragraph) {
            paragraph.style.color = '#ffffff';
        }
    });

    // Fix for light-bg sections with dark inline backgrounds
    const lightBgSections = document.querySelectorAll('.light-bg[style*="background-color: #1a1a1a"], .light-bg[style*="background-color: #222"]');
    lightBgSections.forEach(section => {
        const textElements = section.querySelectorAll('h2, h3, p, li');
        textElements.forEach(element => {
            element.style.color = '#ffffff';
        });
    });
});
