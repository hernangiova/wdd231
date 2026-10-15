const results = document.querySelector("#form-results");
const parameters = new URLSearchParams(window.location.search);

const name = parameters.get("name");
const email = parameters.get("email");
const destination = parameters.get("destination");
const message = parameters.get("message");

results.innerHTML = `
    <h3>Your Information</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Favorite Destination:</strong> ${destination}</p>
    <p><strong>Message:</strong> ${message}</p>
`;

