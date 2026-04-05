document.body.insertAdjacentHTML("afterbegin", `
    <nav class="navbar">
        <div class="logo"><a href="../../index.html">JustAKuleGuy</a></div>
        <button class="hamburger" onclick="toggleMenu()">☰</button>

        <div class="nav-links" id="navLinks">
            <a href="../../Blogs/justakuleguy_blogs.html">Blogs</a>
            <a href="../../YouTube Channels Archive/youtube channels archive.html">YouTubes</a>
            <a href="../../website info.html">Website Info</a>

            <div class="dropdown pc-only">
                <button class="dropdown-btn" onclick="toggleDropdown()">Other ↓</button>
                <div class="dropdown-menu" id="dropdownMenu">
                    <a href="../../Test Video Hosting Embeds/test-video-hosting-embeds.html">📼 Test Video Hosting/Streaming Embeds</a>
                </div>
            </div>

            <button onclick="toggleDarkMode()" class="darkmode-btn">Dark Mode</button>
        </div>
    </nav>
`);

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