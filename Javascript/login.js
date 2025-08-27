$('#btnSubmit').on('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = $('#user').val();
    const password = $('#password').val();

    // Simple validation 
    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }
    /*$.ajax({
        url: ,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username, password }),
        success: function(response) {
            // Handle successful login (e.g., redirect to another page)
            window.location.href = '/employee'; // Change to your desired page
        },
        error: function(xhr, status, error) {
            // Handle login error (e.g., show an error message)
            alert("Login failed: " + xhr.responseText);
        }*/    
});