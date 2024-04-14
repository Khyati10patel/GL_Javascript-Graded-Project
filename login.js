document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if the credentials are valid (for demonstration purpose, hardcoded)
        if (username === 'user' && password === 'password') {
            // Store username in local storage
            localStorage.setItem('username', username);
            // Redirect to Resume Page
            window.location.href = 'resume.html';
        } else {
            errorMessage.textContent = 'Invalid username/password';
        }
    });
});
