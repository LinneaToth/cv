console.log("this works?");


const menuButton = document.querySelector(".menu-toggle-btn");
const navigationMenu = document.getElementById("menu");


console.log("this works?");


const menuVisibility = function () {
    navigationMenu.classList.toggle("hidden");
    menuButton.classList.toggle("fa-bars");
    menuButton.classList.toggle("fa-x");
    console.log("this works");
}

menuButton.addEventListener("click", menuVisibility);


