<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pattern Recall Challenge</title>
    <link rel="stylesheet" href="pattern.css">
</head>
<body>

    <h1>🧠 Pattern Recall Challenge</h1>

    <div class="controls">
        <button id="startBtn">Start</button>
        <button id="pauseBtn">Pause</button>
        <button id="resetBtn">Play Again</button>
        <button class="back-btn" onclick="goHome()">⬅ Back</button>

        <div class="info">
            <span>Level: <b id="level">1</b></span>
            <span>Score: <b id="score">0</b></span>
        </div>
    </div>

    <div id="message">Press Start to Play</div>

    <div id="grid"></div>

    <script src="pattern.js"></script>
</body>
</html>