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

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
    cards.classList.remove("list");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
});