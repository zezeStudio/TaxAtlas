document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded. Initializing menu functionality.');

    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton) {
        console.log('Menu button found:', menuButton);
    } else {
        console.error('Menu button with ID "menu-button" not found!');
    }

    if (mobileMenu) {
        console.log('Mobile menu found:', mobileMenu);
    } else {
        console.error('Mobile menu with ID "mobile-menu" not found!');
    }

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            console.log('Menu button clicked!');
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('translate-x-full'); // For slide-in effect
            mobileMenu.classList.toggle('translate-x-0');    // For slide-in effect
            console.log('Mobile menu classes after toggle:', mobileMenu.classList);
        });
    }

    // Category submenu toggles
    const setupSubmenuToggle = (toggleId, submenuId, arrowId) => {
        const toggleElement = document.getElementById(toggleId);
        const submenuElement = document.getElementById(submenuId);
        const arrowElement = document.getElementById(arrowId); // Get arrow element

        if (toggleElement && submenuElement) {
            console.log(`Toggle element "${toggleId}" and submenu "${submenuId}" found.`);

            toggleElement.addEventListener('click', () => {
                console.log(`Category toggle "${toggleId}" clicked!`);
                submenuElement.classList.toggle('max-h-0');
                submenuElement.classList.toggle('max-h-screen'); // Or a sufficiently large max-height
                if (arrowElement) {
                    arrowElement.classList.toggle('rotate-180');
                }
                console.log(`Submenu "${submenuId}" classes after toggle:`, submenuElement.classList);
            });
        } else {
            if (!toggleElement) console.error(`Toggle element with ID "${toggleId}" not found!`);
            if (!submenuElement) console.error(`Submenu element with ID "${submenuId}" not found!`);
        }
    };

    setupSubmenuToggle('calculators-toggle', 'calculators-submenu', 'calculators-arrow');
    setupSubmenuToggle('tax-guides-toggle', 'tax-guides-submenu', 'tax-guides-arrow');
    setupSubmenuToggle('countries-toggle', 'countries-submenu', 'countries-arrow');

    // Annual Gross Income input validation (for type="text" input)
    const annualGrossIncomeInput = document.getElementById('annual-gross-income');
    if (annualGrossIncomeInput) {
        console.log('Annual Gross Income input found:', annualGrossIncomeInput);
        annualGrossIncomeInput.addEventListener('input', (event) => {
            let value = event.target.value;

            // Remove any non-digit characters (assuming integer input)
            value = value.replace(/[^0-9]/g, '');

            // Update the input value with the cleaned string
            event.target.value = value;

            // Convert to number and ensure it's not negative
            let numericValue = parseInt(value, 10);
            if (isNaN(numericValue) || numericValue < 0) {
                // If the value is empty or becomes NaN/negative after parsing, set to 0
                // but only if it's not an empty string (to allow deletion)
                if (value !== '') {
                    event.target.value = 0;
                }
            }
        });

        // Also add a 'blur' event to ensure final validation on losing focus
        annualGrossIncomeInput.addEventListener('blur', (event) => {
            if (event.target.value === '' || parseInt(event.target.value, 10) < 0) {
                event.target.value = 0;
            }
        });
    } else {
        console.error('Annual Gross Income input with ID "annual-gross-income" not found!');
    }

    // Calculate Now button functionality
    const calculateNowButton = document.getElementById('calculate-now-button');
    const locationSelect = document.getElementById('location-select');

    if (calculateNowButton && locationSelect) {
        console.log('Calculate Now button and Location select found. Attaching event listener.');
        calculateNowButton.addEventListener('click', () => {
            console.log('Calculate Now button clicked!');
            const selectedCountry = locationSelect.value;
            console.log('Selected Country:', selectedCountry);
            let targetPage = '';

            switch (selectedCountry) {
                case 'United States':
                    targetPage = 'usa-calculator.html';
                    break;
                case 'Korea':
                    targetPage = 'korea-calculator.html';
                    break;
                case 'United Kingdom':
                    targetPage = 'uk-calculator.html';
                    break;
                case 'Germany':
                    targetPage = 'germany-calculator.html';
                    break;
                default:
                    console.error('Unknown country selected:', selectedCountry);
                    return; // Do not navigate if country is unknown
            }

            console.log('Target Page:', targetPage);
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    } else {
        if (!calculateNowButton) console.error('Calculate Now button with ID "calculate-now-button" not found!');
        if (!locationSelect) console.error('Location select with ID "location-select" not found!');
    }
});