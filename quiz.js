<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kids Learning Quiz</title>
    <link rel="stylesheet" href="quiz.css">
</head>
<body>

    <div class="quiz-container">
        <div id="game-screen">
            <div class="header">
                <div class="stat-box timer-box">⏳ <span id="time-left">10</span>s</div>
                <div class="stat-box score-box">⭐ <span id="current-score">0</span></div>
            </div>

            <div class="question-area">
                <h2 id="question-text">Loading Question...</h2>
                <div class="image-wrapper">
                    <img id="question-image" src="" alt="Quiz Image" style="display: none;">
                </div>
            </div>

            <div id="options-container" class="options-grid"></div>
        </div>

        <div id="result-screen" class="hidden">
            <div class="congrats-icon">🏆</div>
            <h1>Game Over!</h1>
            <div class="final-score-card">
                <p>Your Total Score</p>
                <h2 id="final-score">0</h2>
            </div>
            <p id="correct-info" class="msg-text"></p>
            <button class="restart-btn" onclick="location.reload()">Play Again</button>
            
            
            
            <a href="home.html">



    <button class="home-btn">Return Home</button>
</a>
        </div>
    </div>

    <script src="quiz.js"></script>
</body>
</html>