// Check if dark mode is saved in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle("dark-mode");

    // Save preference
    if (isDarkMode) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }

    // Update Giscus theme
    const theme = isDarkMode ? 'dark' : 'light';

    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
        giscusFrame.contentWindow.postMessage(
            {
                giscus: {
                    setConfig: {
                        theme: theme
                    }
                }
            },
            'https://giscus.app'
        );
    }
}