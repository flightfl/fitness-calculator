// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes
            alert('Form submitted successfully! (This is just a demo)');
            contactForm.reset();
        });
    }
    
    // Interactive grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        if (!item.classList.contains('item1')) { // Don't apply to header item
            item.addEventListener('click', function() {
                // Toggle an active class to change the appearance
                this.classList.toggle('active');
                
                // DOM manipulation (requirement 10d)
                if (this.classList.contains('active')) {
                    this.style.backgroundColor = 'var(--accent-color)';
                    this.style.color = 'white';
                } else {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }
            });
        }
    });
    
    // Dynamic theme toggle button
    const themeToggleButton = document.createElement('button');
    themeToggleButton.textContent = 'Toggle Dark/Light Mode';
    themeToggleButton.id = 'theme-toggle';
    themeToggleButton.style.position = 'fixed';
    themeToggleButton.style.bottom = '20px';
    themeToggleButton.style.right = '20px';
    themeToggleButton.style.zIndex = '999';
    
    document.body.appendChild(themeToggleButton);
    
    themeToggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            document.body.style.backgroundColor = '#212529';
            document.body.style.color = '#f8f9fa';
        } else {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        }
    });
    
    // BMI Calculator implementation
    const calculateBmiButton = document.getElementById('calculate-bmi');
    if (calculateBmiButton) {
        calculateBmiButton.addEventListener('click', function() {
            const height = parseFloat(document.getElementById('bmi-height').value);
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            
            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                alert('Please enter valid height and weight values.');
                return;
            }
            
            // BMI Formula: weight (kg) / (height (m))^2
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            
            // Round to 1 decimal place
            const roundedBmi = Math.round(bmi * 10) / 10;
            
            // Display the result
            document.getElementById('bmi-result').textContent = roundedBmi;
            
            // Determine BMI category
            let category = '';
            if (bmi < 18.5) {
                category = 'Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal weight';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
            } else {
                category = 'Obese';
            }
            
            document.getElementById('bmi-category').textContent = category;
        });
    }
    
    // Body fat percentage calculator
    const calculateBodyfatButton = document.getElementById('calculate-bodyfat');
    if (calculateBodyfatButton) {
        // Show/hide female-specific fields based on gender selection
        const genderSelect = document.getElementById('gender');
        const femaleOnlyFields = document.querySelectorAll('.female-only');
        
        genderSelect.addEventListener('change', function() {
            femaleOnlyFields.forEach(field => {
                if (this.value === 'female') {
                    field.style.display = 'block';
                } else {
                    field.style.display = 'none';
                }
            });
        });
        
        calculateBodyfatButton.addEventListener('click', function() {
            const gender = document.getElementById('gender').value;
            const heightCm = parseFloat(document.getElementById('bf-height').value);
            const waistCm = parseFloat(document.getElementById('waist').value);
            const neckCm = parseFloat(document.getElementById('neck').value);
            
            if (isNaN(heightCm) || isNaN(waistCm) || isNaN(neckCm) || heightCm <= 0 || waistCm <= 0 || neckCm <= 0) {
                alert('Please enter valid measurements.');
                return;
            }

            // Convert from cm to inches (1 inch = 2.54 cm)
            const cmToInch = 0.393701; // 1 / 2.54
            const height = heightCm * cmToInch;
            const waist = waistCm * cmToInch;
            const neck = neckCm * cmToInch;
            
            let bodyFat = 0;
            
            if (gender === 'male') {
                // U.S. Navy method for men
                bodyFat = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
            } else {
                // U.S. Navy method for women
                const hipCm = parseFloat(document.getElementById('hip').value);
                if (isNaN(hipCm) || hipCm <= 0) {
                    alert('Please enter a valid hip measurement.');
                    return;
                }
                
                const hip = hipCm * cmToInch;
                bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
            }
            
            // Round to 1 decimal place
            const roundedBodyFat = Math.round(bodyFat * 10) / 10;
            
            // Display the result
            document.getElementById('bodyfat-result').textContent = roundedBodyFat + '%';
            
            // Determine body fat category
            let category = '';
            if (gender === 'male') {
                if (bodyFat < 6) {
                    category = 'Essential fat';
                } else if (bodyFat >= 6 && bodyFat < 14) {
                    category = 'Athletic';
                } else if (bodyFat >= 14 && bodyFat < 18) {
                    category = 'Fitness';
                } else if (bodyFat >= 18 && bodyFat < 25) {
                    category = 'Average';
                } else {
                    category = 'Obese';
                }
            } else {
                if (bodyFat < 14) {
                    category = 'Essential fat';
                } else if (bodyFat >= 14 && bodyFat < 21) {
                    category = 'Athletic';
                } else if (bodyFat >= 21 && bodyFat < 25) {
                    category = 'Fitness';
                } else if (bodyFat >= 25 && bodyFat < 32) {
                    category = 'Average';
                } else {
                    category = 'Obese';
                }
            }
            
            document.getElementById('bodyfat-category').textContent = category;
        });
    }
});