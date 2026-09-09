/* SORTING VARIABLES */
    const sortOrder = document.getElementById("sortOrder");

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
    localStorage.setItem(
      SORT_KEY,
      sortType
    );
    localStorage.setItem(
      SORT_ORDER_KEY,
      order
    );
    }


    /* SORT WHEN SORT TYPE CHANGES */
    sortGames.addEventListener(
      "change",
      function() {
        sortGamesList();
      }
    );


    /* SORT WHEN ASCENDING / DESCENDING CHANGES */
    sortOrder.addEventListener(
      "change",
      function() {
        sortGamesList();
      }
    );


    /* LOAD SAVED SORT */
    function loadSavedSort() {
      const savedSort =
        localStorage.getItem(SORT_KEY);
      const savedOrder =
        localStorage.getItem(SORT_ORDER_KEY);
      if (savedSort) {
        sortGames.value = savedSort;
      }
      if (savedOrder) {
        sortOrder.value = savedOrder;
      }
    }

    /* INITIALIZE PAGE */
    loadSavedSort();
    sortGamesList();
    loadOpenStates();
    updateToggleButton();