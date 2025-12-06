// Get references to container and button
const videosContainer = document.getElementById('videos-container');
const sortToggleBtn = document.getElementById('sortToggle');

// Track sort state: true = oldest → newest, false = newest → oldest
let oldestFirst = true;

// Set initial button text to indicate first action
sortToggleBtn.textContent = 'Sort: Newest → Oldest';

// Function to toggle video order
function toggleVideoOrder() {
    // Get all video elements as an array
    const videos = Array.from(videosContainer.getElementsByClassName('video'));

    // Reverse the array
    videos.reverse();

    // Remove current videos from container
    while (videosContainer.firstChild) {
        videosContainer.removeChild(videosContainer.firstChild);
    }

    // Re-append videos in new order
    videos.forEach(video => videosContainer.appendChild(video));

    // Update the sort state and button text
    oldestFirst = !oldestFirst;
    sortToggleBtn.textContent = oldestFirst 
        ? 'Sort: Newest → Oldest' 
        : 'Sort: Oldest → Newest';
}

// Attach click event to button
sortToggleBtn.addEventListener('click', toggleVideoOrder);
