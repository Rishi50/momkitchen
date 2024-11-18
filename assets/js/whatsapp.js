

function getLocation() {

    document.getElementById("location").value = "Fetcing location...."
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Generate a Google Maps link with the user's coordinates
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Display the link in the form's location input field
    document.getElementById("location").value = googleMapsLink;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}


function sendToWhatsapp(event) {
    event.preventDefault();
    
    // Get form values
    let number = "+9779851401214";
    let fullName = document.getElementById("fullName").value;
    let emailAddress = document.getElementById("emailAddress").value;
    let totalPackage = document.getElementById("totalPackage").value;
    let bookingDate = document.getElementById("bookingDate").value;
    let message = document.getElementById("message").value;
    
    // Basic validation (optional)
    if (!fullName || !emailAddress  || !bookingDate || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Check if Geolocation API is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

                // Construct the message including the location URL
                const messageurl = `Name: ${fullName}%0AEmail: ${emailAddress}%0ALocation: ${locationUrl}%0APackage: ${totalPackage}%0ABooking Date: ${bookingDate}%0AMessage: ${message}`;
                
                // WhatsApp API link with the message
                const whatsappUrl = `https://wa.me/${number}?text=${messageurl}`;
                
                // Open WhatsApp with the constructed message
                window.open(whatsappUrl, '_blank');
            },
            (error) => {
                alert("Unable to retrieve location.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
