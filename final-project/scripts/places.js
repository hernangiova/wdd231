const featuredContainer = document.querySelector("#featured-places");
const placesContainer = document.querySelector("#places-container");

async function loadPlaces() {
    try {
        const response = await fetch("data/places.json");
        const places = await response.json();

        if (featuredContainer) {
            const featured = places.filter(place => place.featured);
            displayPlaces(featured, featuredContainer);
        }

        if (placesContainer) {
            displayPlaces(places, placesContainer);
        }
    } catch (error) {
        console.log("Error loading places:", error);
    }
}

function displayPlaces(places, container) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    container.innerHTML = places.map(place => `
        <article class="place-card">
            <img src="${place.image}" alt="${place.name}" width="400" height="250" loading="lazy">
            <h3>${place.name}</h3>
            <p>${place.department}</p>
            <p>${place.category}</p>
            <p>${place.description}</p>
            <p class="weather" id="weather-${place.id}">Loading weather</p>
            <button class="favorite-button" data-id="${place.id}">
                ${favorites.includes(place.id) ? "Remove Favorite" : "Add Favorite"}
            </button>

            <button class="details-button" data-id="${place.id}">
                View Details
            </button>
        </article>
    `).join("");

    places.forEach(place => {
        loadWeather(place.id);
    });

    const dialog = document.querySelector("#place-dialog");
    const dialogContent = document.querySelector("#dialog-content");
    const closeDialog = document.querySelector("#close-dialog");

    const detailButtons = container.querySelectorAll(".details-button");

    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const place = places.find(item => item.id === id);

            dialogContent.innerHTML = `
            <h2>${place.name}</h2>
            <img src="${place.image}" alt="${place.name}" width="400" height="250">
            <p><strong>Department:</strong> ${place.department}</p>
            <p><strong>Category:</strong> ${place.category}</p>
            <p>${place.description}</p>
        `;

            dialog.showModal();
        });
    });

    closeDialog.addEventListener("click", () => {
        dialog.close();
    }); 

    const buttons = container.querySelectorAll(".favorite-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            if (favorites.includes(id)) {
                favorites = favorites.filter(favorite => favorite !== id);
                button.textContent = "Add Favorite";
            } else {
                favorites.push(id);
                button.textContent = "Remove Favorite";
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
}

loadPlaces();

const coordinates = {
    1: [14.5586, -90.7295],
    2: [14.7419, -91.1568],
    3: [17.2220, -89.6237],
    4: [15.5333, -89.9556],
    5: [14.5010, -90.8760],
    6: [15.6630, -89.0030],
    7: [15.8280, -88.7500],
    8: [14.9440, -91.1110],
    9: [14.3810, -90.6010],
    10: [16.9220, -89.8920],
    11: [13.9000, -90.4800],
    12: [17.0660, -89.4000],
    13: [14.8347, -91.5180],
    14: [15.5080, -91.6050],
    15: [14.7410, -90.9340]
};

const APIKey = "e48b74360e5b5149183a4e2fa28830d8"

async function loadWeather(id) {
    const location = coordinates[id];
    const weatherElement = document.querySelector(`#weather-${id}`);

    if (!location || !weatherElement) return;

    const [latitude, longitude] = location;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric&lang=es`;

    try {
        const response = await fetch(url)

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const description = data.weather[0].description;

        weatherElement.textContent = `
            🌡️ Clima: ${description} | Temperatura: ${ temperature } °C | Humedad:${humidity}%
        `;
    } catch (error) {
        weatherElement.textContent = "Weather unavailable";
        console.log(error);
    }
}