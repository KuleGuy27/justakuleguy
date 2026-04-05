function toggleMenu() {
    var menu = document.getElementById("navLinks");
    menu.classList.toggle("show");
}

function toggleDropdown() {
    var dropdown = document.getElementById("dropdownMenu");
    dropdown.classList.toggle("show");
}

// Close dropdown when clicking outside
document.addEventListener("click", function(e) {
    var dropdown = document.getElementById("dropdownMenu");
    if (dropdown && !e.target.closest(".dropdown")) {
        dropdown.classList.remove("show");
    }
});

const navLinks = document.querySelectorAll("#navLinks a");

navLinks.forEach(link => {
    link.addEventListener("click", function() {

        // remove active from all links
        navLinks.forEach(l => l.classList.remove("active"));

        // add active to clicked link
        this.classList.add("active");
    });
});