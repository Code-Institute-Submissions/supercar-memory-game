var windowImages = []; // container for images
    var windowArray = [];
    var windowFlippedOver = [];
    var cardFlipped = -1;
    var timer = '';
    var playLockout = false;
    var gamePlay = false; 

    var runButton = document.getElementById('run'); // to begin the game
    var layOut = document.getElementById('layout'); // layout of game
    var message = document.getElementById('message'); // messages to player at top of layout

    
    runButton.addEventListener('click', runGame); // event listens to run button to begin the game once clicked

    function runGame() {
      cardFlipped = -1;
      playLockout = false;
      runButton.style.display = 'none';
      if (!gamePlay) {
        gamePlay = true;
        buildArray();
        windowArray = windowImages.concat(windowImages);
        shuffleArray(windowArray);
        buildGrid();
        message.innerHTML = "Click any window"; // message to player to click on a window
      }
    }