<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Word Scramble Game</title>
    <link rel="stylesheet" href="word.css">
</head>
<body>

<div class="game-container">
    <h1>Word Scramble</h1>

    <h2 id="scrambled-word">loading...</h2>
    <p id="hint">Hint: </p>
    <input type="text" id="user-input" placeholder="Enter your guess"><br><br>
    <button id="submit-btn">Submit</button>
    <button id="skip-btn">Skip</button>

    <p id="message"></p>
    <p id="score">Score: 0</p>

    <button id="play-again">Play Again</button><br><br><br>
    <button class="back-btn" onclick="goHome()">⬅ Back</button>
</div>

<script src="word.js"></script>
</body>
</html>