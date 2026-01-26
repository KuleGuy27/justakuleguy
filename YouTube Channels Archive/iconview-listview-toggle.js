const container = document.getElementById("videos-container");
const toggleBtn = document.getElementById("viewToggle");

// Load saved view (default = icon view)
let iconView = localStorage.getItem("iconView") !== "false";

// Apply view on page load
container.classList.toggle("icon-view", iconView);
toggleBtn.textContent = iconView ? "List View" : "Icon View";

// Toggle view
toggleBtn.addEventListener("click", () => {
    iconView = !iconView;

    container.classList.toggle("icon-view", iconView);
    toggleBtn.textContent = iconView ? "List View" : "Icon View";

    // Save preference
    localStorage.setItem("iconView", iconView);
});

