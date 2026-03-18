function toggleMenu() {
    var menu = document.getElementById("navLinks");
    menu.classList.toggle("show");
}

const navLinks = document.querySelectorAll("#navLinks a");

navLinks.forEach(link => {
    link.addEventListener("click", function() {

        // remove active from all links
        navLinks.forEach(l => l.classList.remove("active"));

        // add active to clicked link
        this.classList.add("active");
    });
});