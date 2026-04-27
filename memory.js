<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Memory Game</title>
  <link rel="stylesheet" href="memory.css" />
</head>
<body>
  <div class="game-container">
    <h1>Memory Game</h1>
    <div class="stats">
      Moves: <span id="moves">0</span> |
      Time: <span id="timer">0</span>s
    </div>
    <div class="grid" id="grid"></div>
    <button id="restart">Restart</button>
  <button onclick="goHome()">⬅ Back</button>

  </div>
  <div class="btn-group">
</div>
  <div id="result-modal" class="modal hidden">
    <div class="modal-content">
      <h2>You Win!</h2>
      <p id="result-text"></p>
      <button onclick="restartGame()">Play Again</button>
    </div>
  </div>

  <script src="memory.js"></script>
</body>
</html>
