    // Check if dark mode is saved in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }

    function toggleDarkMode() {
      const isDarkMode = document.body.classList.toggle("dark-mode");

      // Save the user's preference in localStorage
      if (isDarkMode) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    }