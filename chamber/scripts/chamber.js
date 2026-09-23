const cards = document.querySelector(".cards");
const url = "data/members.json";

async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();

    displayCompanies(data.chamber);
}

getCompanyData();

const displayCompanies = (companies) => {

    companies.forEach(company => {
        
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let content = document.createElement("div");
        let image = document.createElement("img");
        let info = document.createElement("div");
        let email = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");

        card.classList.add("card");
        content.classList.add("card-content");

        image.setAttribute("src", company.image);
        image.setAttribute("alt", `${company.name} logo`);

        name.textContent = company.name;
        email.textContent = company.email;
        phone.textContent = company.phone;

        website.textContent = (`URL: ${company.name}`);
        website.setAttribute("href", company.website);

        email.classList.add("business-info");
        phone.classList.add("business-info");

        info.appendChild(email);
        info.appendChild(phone);
        info.appendChild(website);

        content.appendChild(image);
        content.appendChild(info);

        card.appendChild(name);
        card.appendChild(content);

        cards.appendChild(card);
    });
};

if (cards) {
    getCompanyData();
}

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

if (gridButton && listButton && cards) {

    gridButton.addEventListener("click", () => {
        cards.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        cards.classList.add("list");
    });
}


const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=14.6349&lon=-90.5069&units=metric&appid=e48b74360e5b5149183a4e2fa28830d8";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=14.6349&lon=-90.5069&units=metric&appid=e48b74360e5b5149183a4e2fa28830d8";

async function getWeather() {
    try {
        const weatherResponse = await fetch(weatherURL);
        const data = await weatherResponse.json();

        console.log(data);

        displayCurrentWeather(data);

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);
    } catch (error) {
        console.error("Error getting weather");
    }
}

function displayCurrentWeather(data) {
    const weather = document.querySelector("#current-weather");

    weather.innerHTML = `<p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
                        <p><strong>Weather:</strong> ${data.weather[0].description}</p>    
    `;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector("#forecast-container");

    const dailyForecast = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

    forecastContainer.innerHTML = "";

    dailyForecast.slice(0, 3).forEach((day) => {
        const date = new Date(day.dt_txt);

        const article = document.createElement("article");

        article.innerHTML = `<h4>${date.toLocaleDateString("en-US", { weekday: "long" })}</h4>
        <p>${Math.round(day.main.temp)}°C</p>
        `;

        forecastContainer.appendChild(article);
    });
}

getWeather();

async function getSpotlights() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        const members = data.chamber.filter(
            member => member.membership === 2 || member.membership === 3
        );

        const shuffled = members.sort(() => Math.random() - 0.5);

        const selectedMembers = shuffled.slice(0, 3);

        displaySpotlight(selectedMembers);
    } catch (error) {
        console.error("Error loading members");
    }
}

function displaySpotlight(members) {
    const container = document.querySelector("#spotlight-container");

    container.innerHTML = "";

    members.forEach(member => {

        const level = member.membership === 3
            ? "Gold Member"
            : "Silver Member"
        
        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <h3>${member.name}</h3>

            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <p><strong>Phone: </strong>${member.phone}</p>
            <p><strong>Email: </strong>${member.email}</p>
            <p><strong>Membership: </strong>${level}</p>

            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;

        container.appendChild(card);
    });
}

getSpotlights();