let menuOpen = false;
let menuItem;

// get the menu item as soon as the page is loaded
window.addEventListener('load', () => {
    menuItem = document.getElementById("navigation");
})

// when the page is expanded, expand the nav
window.onresize = () => {
        if (window.innerWidth > 700) {
            menuItem.style.width = "250px"; 
            menuOpen = true;
        }
        else if (window.innerWidth < 700) {
            menuItem.style.width = "0"; 
            menuOpen = false;
        }
    };

function toggleNav() {
    if (menuOpen) {
        document.getElementById("navigation").style.width = "0";
        menuOpen = false;
    }
    else {
        document.getElementById("navigation").style.width = "250px";
        menuOpen = true;
    }
}