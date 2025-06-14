const dropdown = document.getElementById("dropdown");
const button = document.getElementById("dropdownButton");
const menu = document.getElementById("dropdownMenu");
const menuItems = Array.from(menu.querySelectorAll("li"));

let open = false;

function toggleDropdown(show) {
    open = show ?? !open;
    dropdown.classList.toggle("open", open);
    button.setAttribute("aria-expanded", open);
    if (open) menuItems[0].focus();
}

button.addEventListener("click", (e) => {
    toggleDropdown();
});

document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        toggleDropdown(false);
    }
});

/* keyboard */
let currentIndex = 0;
menu.addEventListener("keydown", (e) => {
    if (!open) return;
    const max = menuItems.length - 1;
    if (e.key === "ArrowDown") {
        e.preventDefault();
        currentIndex = (currentIndex + 1) > max ? 0 : currentIndex + 1;
        menuItems[currentIndex].focus();
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        currentIndex = (currentIndex - 1) < 0 ? max : currentIndex - 1;
        menuItems[currentIndex].focus();
    } else if (e.key === "Enter") {
        alert(`You selected ${menuItems[currentIndex].textContent}`);
        toggleDropdown(false);
    } else if (e.key === "Escape") {
        toggleDropdown(false);
        button.focus();
    }
});

button.addEventListener("click", () => {
    currentIndex = 0;
});
