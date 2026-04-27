<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Number Sequence Memory Game</title>
    <link rel="stylesheet" href="number.css">
</head>
<body>
    <div class="game-container">
        <h1>Number Sequence Memory Game</h1>
        <div id="level-container">
            Level: <span id="level">1</span>
        </div>
        <div id="sequence-display"></div>
        <input type="text" id="user-input" placeholder="Enter the sequence" autocomplete="off">

        <div class="button-container">
            <button id="submit-btn">Submit</button>
            <button id="play-again-btn">Play Again</button>
            <button class="back-btn" onclick="goHome()">⬅ Back</button>

            
        </div>

        <div id="message"></div>
    </div>
    <script src="number.js"></script>
</body>
</html>