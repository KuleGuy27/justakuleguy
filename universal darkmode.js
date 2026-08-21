// Check if dark mode is saved in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

function getCurrentTheme() {
    return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
}

function sendGiscusTheme() {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
        giscusFrame.contentWindow.postMessage(
            {
                giscus: {
                    setConfig: {
                        theme: getCurrentTheme()
                    }
                }
            },
            'https://giscus.app'
        );
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');

    // Update Giscus theme
    sendGiscusTheme();
}

// Giscus loads asynchronously and sends a "ready" message once its iframe
// has initialized. We listen for that and push our saved theme to it then —
// this is what was missing before, since without it, Giscus just keeps
// whatever theme was in its data-theme attribute on page load.
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://giscus.app') return;
    if (!(typeof event.data === 'object' && event.data.giscus)) return;

    sendGiscusTheme();
});