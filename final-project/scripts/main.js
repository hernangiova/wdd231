const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});