let iconView = true; // ICON VIEW IS DEFAULT

document.getElementById("viewToggle").addEventListener("click", () => {
    const container = document.getElementById("videos-container");

    iconView = !iconView;

    container.classList.toggle("icon-view", iconView);

    document.getElementById("viewToggle").textContent =
        iconView ? "List View" : "Icon View";
});