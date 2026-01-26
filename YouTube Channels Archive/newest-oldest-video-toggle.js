// Get references to container and button
const videosContainer = document.getElementById('videos-container');
const sortToggleBtn = document.getElementById('sortToggle');

// Load saved sort state (default = false → newest → oldest)
let oldestFirst = localStorage.getItem('oldestFirst') === 'true';

// Set initial button text correctly
sortToggleBtn.textContent = oldestFirst
    ? 'Sort: Newest → Oldest'
    : 'Sort: Oldest → Newest';

// If saved state is oldestFirst, apply it on page load
if (oldestFirst) {
    reverseVideos();
}

// Function to reverse videos
function reverseVideos() {
    const videos = Array.from(videosContainer.getElementsByClassName('video'));
    videos.reverse();

    // Clear container and append in new order
    while (videosContainer.firstChild) {
        videosContainer.removeChild(videosContainer.firstChild);
    }

    videos.forEach(video => videosContainer.appendChild(video));
}

// Function to toggle video order
function toggleVideoOrder() {
    reverseVideos();

    // Flip current state
    oldestFirst = !oldestFirst;

    // Save current state
    localStorage.setItem('oldestFirst', oldestFirst);

    // Update button text for next action
    sortToggleBtn.textContent = oldestFirst
        ? 'Sort: Newest → Oldest'
        : 'Sort: Oldest → Newest';
}

// Attach click event to button
sortToggleBtn.addEventListener('click', toggleVideoOrder);

