function toggleDropdown(btn) {
    var menu = btn.nextElementSibling;
    var wasOpen = menu.classList.contains("show");

    // close all dropdowns first
    document.querySelectorAll(".dropdown-menu.show")
        .forEach(function(m) { m.classList.remove("show"); });

    // reopen only if it was closed
    if (!wasOpen) menu.classList.add("show");
}

// Close dropdowns when clicking outside
document.addEventListener("click", function(e) {
    if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu.show")
            .forEach(function(m) { m.classList.remove("show"); });
    }
});