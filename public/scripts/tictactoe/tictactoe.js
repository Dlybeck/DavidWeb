document.addEventListener("DOMContentLoaded", function(){
    // Create an array to represent the game board
    var gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
    ];

    // Get all td elements in the table
    var cells = document.getElementsByTagName("td");

    document.getElementsByTagName("button")[0].addEventListener("click", resetGame);

    function resetGame() {
      gameBoard = [    ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      currentPlayer = "X";
      gameOver = false;
      for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
      }
    }

    // Add an event listener to each td element
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", function() {
        // When a td element is clicked, get its row and column indices
        var row = this.parentElement.rowIndex;
        var col = this.cellIndex;

        // Call the takeTurn function with the row and column indices
        takeTurn(row, col);
      });
    }

    // Initialize variables to keep track of the current player and the game state
    var gameOver = false;

    // Create a variable to keep track of the current player's symbol
    var currentPlayer = "X";

    // Function to handle a player's turn
    // Function to handle a player's turn
    function takeTurn(row, col) {
      // Check if the game is already over or if the selected cell is already occupied
      if (gameOver || gameBoard[row][col] != "") {
        return;
      }

      // Check if it is the current player's turn
      if (currentPlayer == "X") {
        // Place the current player's symbol on the game board
        gameBoard[row][col] = currentPlayer;

        // Update the td element to display the current player's symbol
        cells[row * gameBoard[0].length + col].innerHTML = currentPlayer;

        // Check if the current player has won
        if (checkWin(currentPlayer)) {
            // If the current player has won, set the game state to over and display a win message
            gameOver = true;

            if (currentPlayer === "X") {
                var scoreElement = document.getElementById("player1Score");
            } else {
                var scoreElement = document.getElementById("player2Score");
            }

            // Increment the player's score
            var currentScore = parseInt(scoreElement.innerHTML);
            scoreElement.innerHTML = currentScore + 1;

            alert(currentPlayer + " wins!");
        } else if (checkTie()) {
          // If there is a tie, set the game state to over and display a tie message
          gameOver = true;
          alert("It's a tie!");
        }

        // Switch the current player after each turn
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
      }
      else if (currentPlayer == "O") {
        // Place the current player's symbol on the game board
        gameBoard[row][col] = currentPlayer;

        // Update the td element to display the current player's symbol
        cells[row * gameBoard[0].length + col].innerHTML = currentPlayer;

        // Check if the current player has won
        if (checkWin(currentPlayer)) {
            // If the current player has won, set the game state to over and display a win message
            gameOver = true;

            if (currentPlayer === "X") {
                var scoreElement = document.getElementById("player1Score");
            } else {
                var scoreElement = document.getElementById("player2Score");
            }

            // Increment the player's score
            var currentScore = parseInt(scoreElement.innerHTML);
            scoreElement.innerHTML = currentScore + 1;

            alert(currentPlayer + " wins!");
        } else if (checkTie()) {
            // If there is a tie, set the game state to over and display a tie message
            gameOver = true;
            alert("It's a tie!");
        }

        // Switch the current player after each turn
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
        }
    }

    // Function to check if the current game is tied
    function checkTie() {
      for (var row = 0; row < gameBoard.length; row++) {
        for (var col = 0; col < gameBoard[row].length; col++) {
          if (gameBoard[row][col] === "") {
            return false;
          }
        }
      }
      return true;
    }

    // Function to check if the current player has won
    function checkWin(player) {
      // Check all rows
      for (var i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i][0] == player && gameBoard[i][1] == player && gameBoard[i][2] == player) {
          return true;
        }
      }

      // Check all columns
      for (var i = 0; i < gameBoard[0].length; i++) {
        if (gameBoard[0][i] == player && gameBoard[1][i] == player && gameBoard[2][i] == player) {
          return true;
        }
      }

      // Check both diagonals
      if (gameBoard[0][0] == player && gameBoard[1][1] == player && gameBoard[2][2] == player) {
        return true;
      }
      if (gameBoard[0][2] == player && gameBoard[1][1] == player && gameBoard[2][0] == player) {
        return true;
      }

      // If none of the checks have returned true, the player has not won
      return false;
    }

  })