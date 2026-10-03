document.body.insertAdjacentHTML("afterbegin", `
    <nav class="navbar">
        <div class="logo"><a href="../../../../index.html">JustAKuleGuy</a></div>
        <button class="hamburger" onclick="toggleMenu()">☰</button>

        <div class="nav-links" id="navLinks">

            <div class="dropdown pc-only">
                <button class="dropdown-btn" onclick="toggleDropdown(this)">Main ↓</button>
                <div class="dropdown-menu">
                    <a href="../../../../Main Content/Blogs/justakuleguy_blogs.html">📝 Blogs</a>
                    <a href="../../../../Main Content/website info.html">📓 Website Info</a>
                </div>
            </div>

            <div class="dropdown pc-only">
                <button class="dropdown-btn" onclick="toggleDropdown(this)">Archives ↓</button>
                <div class="dropdown-menu">
                    <a href="../../../../Archives/YouTube Channels Archive/youtube channels archive.html"><img src="../../../../IMAGES - Social Media Logos/youtube-logo-hd-8-1348870541.png" width="20px"> YouTube Channels Archive</a>
                </div>
            </div>

            <div class="dropdown pc-only">
                <button class="dropdown-btn" onclick="toggleDropdown(this)">Interests ↓</button>
                <div class="dropdown-menu">
                    <a href="../../../../Interests/Video Games I'm Interested In/interestingvideogames.html">🎮 Video Games I'm Interested In</a>
                    <a href="../../../../Interests/My Favorite ROBLOX Games/favorite-roblox-games.html"><img src="../../../../IMAGES - Other Links/Roblox_Corporation_2025_logo.svg.webp"> My Favorite ROBLOX Games</a>
                </div>
            </div>

            <button onclick="toggleDarkMode()" class="darkmode-btn">Dark Mode</button>
        </div>
    </nav><br></br>
`);

function toggleMenu() {
    var menu = document.getElementById("navLinks");
    menu.classList.toggle("show");
}

function toggleDropdown(btn) {
    const menu = btn.nextElementSibling;   // the .dropdown-menu right after the button

    // close any other open dropdowns
    document.querySelectorAll(".dropdown-menu.show").forEach(m => {
        if (m !== menu) m.classList.remove("show");
    });

    menu.classList.toggle("show");
}

// Close dropdowns when clicking outside
document.addEventListener("click", function(e) {
    if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu.show").forEach(m => m.classList.remove("show"));
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