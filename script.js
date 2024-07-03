// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust offset as needed
            behavior: 'smooth'
        });
    });
});

// Form submission validation and submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate form submission (replace with actual AJAX submission if needed)
    alert(`Thank you, ${name}! Your message has been sent.`);
    this.reset(); // Reset the form after successful submission
});

// Existing JavaScript remains the same

// Function to calculate BMI
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid values for height and weight.');
        return;
    }

    const bmi = weight / Math.pow(height / 100, 2);
    const bmiResult = document.getElementById('bmi-result');
    bmiResult.innerHTML = `Your BMI: ${bmi.toFixed(1)}`;
}
