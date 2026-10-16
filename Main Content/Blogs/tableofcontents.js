document.addEventListener("DOMContentLoaded", () => {
    const toc = document.getElementById("table-of-contents");
    const toggle = document.getElementById("toc-toggle");
    const current = document.getElementById("toc-current");
    const links = [...document.querySelectorAll("#toc-list a")];
    const headings = links.map(a => document.querySelector(a.getAttribute("href")));
    const defaultText = current.textContent;

    // open / close
    toggle.addEventListener("click", () => {
        const open = toc.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
    });
    const close = () => {
        toc.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    };
    links.forEach(a => a.addEventListener("click", close));
    document.addEventListener("click", e => { if (!toc.contains(e.target)) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

    // highlight current section
    function update() {
        const offset = toc.offsetHeight + 80;
        let idx = -1;
        headings.forEach((h, i) => {
            if (h && h.getBoundingClientRect().top <= offset) idx = i;
        });
        // at the very bottom of the page, force the last section
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
            idx = headings.length - 1;
        }
        links.forEach((a, i) => a.classList.toggle("active", i === idx));
        current.textContent = idx >= 0 ? links[idx].textContent : defaultText;
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => { update(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
});