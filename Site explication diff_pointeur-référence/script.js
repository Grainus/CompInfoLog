document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Trigger when element is in the middle 20% of screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('data-target');
                const state = entry.target.getAttribute('data-state');

                // Update active class on steps
                const columnSteps = entry.target.parentElement.querySelectorAll('.step');
                columnSteps.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');

                // Update code container state
                const column = document.getElementById(`${targetId}-column`);
                if (column) {
                    const codeContainer = column.querySelector('.code-container');
                    codeContainer.setAttribute('data-state', state);

                    // Update tooltips
                    const tooltips = codeContainer.querySelectorAll('.tooltip-msg');
                    tooltips.forEach(t => {
                        if (t.getAttribute('data-for') === state) {
                            t.classList.add('active');
                        } else {
                            t.classList.remove('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    steps.forEach(step => observer.observe(step));

    // Diving Effect Observer
    // Trigger when the #diving-section is in view
    const divingSection = document.getElementById('diving-section');
    const divingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add('diving-mode');
            } else {
                document.body.classList.remove('diving-mode');
            }
        });
    }, { threshold: 0.1 });

    if (divingSection) {
        divingObserver.observe(divingSection);
    }
});
