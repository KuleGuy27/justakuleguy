const jumpMenu = document.getElementById("jumpMenu");
const menuContainer = document.getElementById("jump-menu-container");

const headings = Array.from(
    document.querySelectorAll("h1#intro, h1#exrates, h1#terse, h1#version")
);

let lastScrollY = window.scrollY;
let isJumping = false;

/* ---------- CLICK / DROPDOWN NAVIGATION ---------- */
function jumpToSection(hash) {
    if (!hash) return;

    isJumping = true;

    document.querySelector(hash).scrollIntoView({
        behavior: "smooth"
    });

    // Stop ignoring scroll once animation is likely finished
    setTimeout(() => {
        isJumping = false;
    }, 500);
}

/* ---------- SCROLL-SPY LOGIC ---------- */
function onScroll() {
    if (isJumping) {
        lastScrollY = window.scrollY;
        return;
    }

    const menuBottom = menuContainer.getBoundingClientRect().bottom;
    const scrollingUp = window.scrollY < lastScrollY;

    for (let i = headings.length - 1; i >= 0; i--) {
        const rect = headings[i].getBoundingClientRect();

        if (
            (scrollingUp && rect.bottom <= menuBottom + 1) ||
            (!scrollingUp && rect.top <= menuBottom + 1)
        ) {
            jumpMenu.value = `#${headings[i].id}`;
            break;
        }
    }

    lastScrollY = window.scrollY;
}

window.addEventListener("scroll", onScroll, { passive: true });
