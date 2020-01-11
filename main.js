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

    function buildArray() {
      for (var x = 1; x < 21; x++) {  // x = 1 continue the for loop while x is less than 21
        windowImages.push(x + '.jpg'); // pushing supercar images to the layout
      }
    }
    function buildGrid() {
      var html = "";
      for (var x = 0; x <= (windowArray.length - 1); x++) {
        html += '<div class="layOut"><div class="layOut">';
        html += '<img id="' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
      }
      layout.innerHTML = html;
    }
     // picking a card function to pick a supercar and it will flip over in the window
    function pickCard(windowIndex, w) {
      if (!isinArray(w.id, windowFlippedOver) && !playLockout) {
        if (cardFlipped >= 0) {
          cardFlip(w, windowIndex);
          playLockout = true;
          // check image function to see if a match has been found
          if (checkSrc(windowFlippedOver[windowFlippedOver.length - 1]) == checkSrc(windowFlippedOver[windowFlippedOver.length - 2])) {
            message.innerHTML = "Match Found. Your doing great  Click for more supercars";
            playLockout = false;
            cardFlipped = -1;
            if (windowFlippedOver.length == windowArray.length) {
              gameover();
            }
          } else {
            message.innerHTML = "Sorry No Match have another go";
            timer = setInterval(hideCard, 2000);// interval timer will have a 2 second delay before the pair of non matched windows returns to unclicked windows
          }
        } else {
          cardFlipped = windowIndex;
          cardFlip(w, windowIndex);
        }
      } else {
        message.innerHTML = "sorry Not clickable";
      }
    }

    function hideCard() {
      for (var x = 0; x < 2; x++) {
        var vid = windowFlippedOver.pop();
        document.getElementById(vid).src = "images/back.jpg";
      }
      clearInterval(timer);
      playLockout = false;
      cardFlipped = -1;
      message.innerHTML = "Click any window";
    }
      // game over function to message player that they have won and to reset the game
    function gameover() {
      runButton.style.display = 'block';
      message.innerHTML = "Congratulations You have won click begin to start new game";
      gamePlay = false;
      windowImages = [];
      windowFlippedOver = [];
    }

    function isinArray(v, array) {
      return array.indexOf(v) > -1;
    }

    function cardFlip(w, wi) {
      w.src = "images/" + windowArray[wi];
      windowFlippedOver.push(w.id);
    }

    function checkSrc(v) {
      var v = document.getElementById(v).src;
      return v;
    }
      // math function to make the random pattern work
    function shuffleArray(array) {                
      for (var x = array.length - 1; x > 0; x--) {
        var holder = Math.floor(Math.random() * (x + 1));
        var itemValue = array[x];
        array[x] = array[holder];
        array[holder] = itemValue;
      }
      return array;
    }