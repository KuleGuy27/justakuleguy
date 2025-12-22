function jumpToSection(hash) {
    if (hash) {
        document.querySelector(hash).scrollIntoView({
            behavior: "smooth"
        });
    }
}
