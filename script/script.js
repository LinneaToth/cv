/* menu button, the menu itself and the body element are selected and assigned to variables */
const menuButton = document.querySelector(".menu-toggle-btn");
const navigationMenu = document.getElementById("menu");
const gridBody = document.querySelector("body");


/* a simple function that does the following: Toggling visibility, changing if the menu button icon is showing bars or a cross, locks the screen in place beneath the menu when it is activated */
const menuVisibility = function () {
    navigationMenu.classList.toggle("hidden");
    menuButton.classList.toggle("fa-bars");
    menuButton.classList.toggle("fa-x");
    gridBody.classList.toggle("static");
}

/* listening for a click on the menu button, running the function above when it gets one */
menuButton.addEventListener("click", menuVisibility);


