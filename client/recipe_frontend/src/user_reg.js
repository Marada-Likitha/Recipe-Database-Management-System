document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Send this data to your server for registration
    // You'll need a server-side script to handle this data, validate, and store it in a database securely.
});