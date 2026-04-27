<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Target Click Focus Game</title>
    <link rel="stylesheet" href="target.css">
</head>
<body>
    <h1>Target Click Focus Game</h1>

    <div id="controls">
        <label for="level">Select Level:</label>
        <select id="level">
            <option value="beginner">Beginner</option>
            <option value="pro">Pro</option>
            <option value="legend">Legend</option>
        </select>
        <button id="startBtn">Start Game</button>
        <button id="playAgainBtn">Play Again</button>
        <button id="pauseBtn">Pause</button>
        <button class="back-btn" onclick="goHome()">⬅ Back</button>
    </div>

    <div id="score-board">
        <span>Score: <span id="score">0</span></span>
        <span>Time: <span id="timer">30</span>s</span>
    </div>

    <div id="play-area"></div>

    <!-- Final Score Box -->
    <div id="score-box">
        <h2>Game Over!</h2>
        <p>Your final score: <span id="final-score">0</span></p>
        <button id="replayBtn">Play Again</button>
    </div>

    <script src="target.js"></script>
</body>
</html>