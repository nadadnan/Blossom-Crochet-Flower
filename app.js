//-------------------------------- Account page -----------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Function to show success message
    function showSuccessMessage(message) {
        alert(message);

        if (message === 'Login successful!') {
            window.location.href = 'Products.html'; // Redirect to Products page
        } else if (message === 'Registration successful!') {
             // Refresh the page
            window.location.reload();
        }
    }

    // Event listener for login form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        showSuccessMessage('Login successful!');
    });

    // Event listener for register form submission
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        showSuccessMessage('Registration successful!');
    });
});
//-------------------------------- Account page End -----------------------------//