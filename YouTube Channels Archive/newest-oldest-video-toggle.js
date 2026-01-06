// Get references to container and button
const videosContainer = document.getElementById('videos-container');
const sortToggleBtn = document.getElementById('sortToggle');

// Track sort state: true = oldest → newest, false = newest → oldest
let oldestFirst = false;

// Set initial button text to indicate first action
sortToggleBtn.textContent = 'Sort: Oldest → Newest';

// Function to toggle video order
function toggleVideoOrder() {
    const videos = Array.from(videosContainer.getElementsByClassName('video'));
    videos.reverse();

    while (videosContainer.firstChild) {
        videosContainer.removeChild(videosContainer.firstChild);
    }

    videos.forEach(video => videosContainer.appendChild(video));

    // Flip current state
    oldestFirst = !oldestFirst;

    // Button shows the NEXT sort direction
    sortToggleBtn.textContent = oldestFirst
        ? 'Sort: Newest → Oldest'
        : 'Sort: Oldest → Newest';
}

// Attach click event to button
sortToggleBtn.addEventListener('click', toggleVideoOrder);
