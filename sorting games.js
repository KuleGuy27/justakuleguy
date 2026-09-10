/* SORTING VARIABLES */
const sortGames = document.getElementById("sortGames");
const sortOrder = document.getElementById("sortOrder");
const gameList = document.getElementById("gameList");
const toggleAllBtn = document.getElementById("toggleAll");

/* LOCAL STORAGE KEYS */
const OPEN_GAMES_KEY = "kuleGameOpenStates";
const SORT_KEY = "kuleGameSort";
const SORT_ORDER_KEY = "kuleGameSortOrder";


/* SORT GAMES */
function sortGamesList() {
  const games = Array.from(
    gameList.querySelectorAll("article")
  );
  const sortType = sortGames.value;
  const order = sortOrder.value;
  games.sort(function(a, b) {
    let comparison = 0;

    /* Alphabetical */
    if (sortType === "alphabetical") {
      comparison = a.dataset.title.localeCompare(
        b.dataset.title,
        undefined,
        {
          numeric: true,
          sensitivity: "base"
        }
      );
    }

    /* Release Date */
    else if (sortType === "release") {
      comparison = a.dataset.release.localeCompare(
        b.dataset.release
      );
    }

    /* Developer */
    else if (sortType === "developer") {
      comparison = a.dataset.developer.localeCompare(
        b.dataset.developer,
        undefined,
        {
          sensitivity: "base"
        }
      );
    }

    /* Game Length */
    else if (sortType === "length") {
      comparison =
        parseFloat(a.dataset.length) -
        parseFloat(b.dataset.length);
    }

    /* Reverse for descending */
    if (order === "descending") {
      comparison *= -1;
    }
    return comparison;
  });

  /* Put games back into the page */
  games.forEach(function(game) {
    gameList.appendChild(game);
  });

  /* Remember selected sorting */
  localStorage.setItem(SORT_KEY, sortType);
  localStorage.setItem(SORT_ORDER_KEY, order);
}


/* SORT WHEN SORT TYPE CHANGES */
sortGames.addEventListener("change", function() {
  sortGamesList();
});


/* SORT WHEN ASCENDING / DESCENDING CHANGES */
sortOrder.addEventListener("change", function() {
  sortGamesList();
});


/* LOAD SAVED SORT */
function loadSavedSort() {
  const savedSort = localStorage.getItem(SORT_KEY);
  const savedOrder = localStorage.getItem(SORT_ORDER_KEY);
  if (savedSort) {
    sortGames.value = savedSort;
  }
  if (savedOrder) {
    sortOrder.value = savedOrder;
  }
}


/* ============================= */
/* EXPAND ALL / COLLAPSE ALL     */
/* ============================= */

/* Save which games are open, per game-id */
function saveOpenStates() {
  const states = {};
  gameList.querySelectorAll("article").forEach(function(article) {
    const id = article.dataset.gameId;
    const details = article.querySelector("details");
    states[id] = details.open;
  });
  localStorage.setItem(OPEN_GAMES_KEY, JSON.stringify(states));
}

/* Restore open/closed state per game on page load */
function loadOpenStates() {
  const saved = localStorage.getItem(OPEN_GAMES_KEY);
  if (!saved) return;

  let states;
  try {
    states = JSON.parse(saved);
  } catch (e) {
    return;
  }

  gameList.querySelectorAll("article").forEach(function(article) {
    const id = article.dataset.gameId;
    const details = article.querySelector("details");
    if (states.hasOwnProperty(id)) {
      details.open = states[id];
    }
  });
}

/* Update button label based on current expand/collapse state */
function updateToggleButton() {
  if (!toggleAllBtn) return;
  const allDetails = gameList.querySelectorAll("details");
  const anyClosed = Array.from(allDetails).some(function(d) {
    return !d.open;
  });
  toggleAllBtn.textContent = anyClosed ? "Expand All" : "Collapse All";
}

/* Toggle all games open/closed when button is clicked */
if (toggleAllBtn) {
  toggleAllBtn.addEventListener("click", function() {
    const allDetails = gameList.querySelectorAll("details");
    const anyClosed = Array.from(allDetails).some(function(d) {
      return !d.open;
    });

    allDetails.forEach(function(d) {
      d.open = anyClosed;
    });

    updateToggleButton();
    saveOpenStates();
  });
}

/* Keep button label + saved state in sync when a user manually
   expands/collapses a single game via its <summary> */
document.addEventListener("toggle", function(e) {
  if (e.target.tagName === "DETAILS" && gameList.contains(e.target)) {
    updateToggleButton();
    saveOpenStates();
  }
}, true);


/* INITIALIZE PAGE */
loadSavedSort();
sortGamesList();
loadOpenStates();
updateToggleButton();