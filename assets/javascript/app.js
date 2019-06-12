$(document).ready(function() {

    var gameObj = {
        questionDisplay: $("#display-div"),
        questionNum: 0,
        questionOrder: [],
        correct: 0,
        wrong: 0,
        noAnswer: 0,
        gameOver: true,
        response1: $("#button-1"),
        response2: $("#button-2"),
        response3: $("#button-3"),
        response4: $("#button-4"),
        answerButtons: $(".response-btn"),
        startButton: $(".start-button"),
        gameOverClip: $("#game-over-clip"),

        resetGame: function() {
            console.log("code to reset the game goes here....");
            this.correct = 0;
            this.wrong = 0;
            this.noAnswer = 0;
            this.gameOver = false;
            this.questionOrder = [];
            this.questionNum = 0;

            for (i=0; i<TriviaQuestions.length; i++) {
                this.questionOrder.push(i);
            }
            shuffle(this.questionOrder);
        }
    }

    var questionTimeout;
    var answerTimeout;

    // for (i=0; i<TriviaQuestions.length; i++) {
    //     gameObj.questionOrder.push(i);
    // }
    // shuffle(gameObj.questionOrder);

    gameObj.startButton.click(function() {
        if (gameObj.gameOver) {
            gameObj.resetGame();
        }
        getQuestion();
    });

    gameObj.response1.click(function() {
        checkGuess(this.value); 
    })
    gameObj.response2.click(function() {
        checkGuess(this.value);
    })
    gameObj.response3.click(function() {
        checkGuess(this.value);
    })
    gameObj.response4.click(function() {
        checkGuess(this.value);
    })

    function getQuestion() {    
        if (!questionTimeout) {
            answerTimeout = undefined;
            gameObj.startButton.hide();
            gameObj.answerButtons.show();
            if (gameObj.questionOrder.length !== 0) {
                gameObj.questionNum = gameObj.questionOrder.pop()
                gameObj.questionDisplay.html(TriviaQuestions[gameObj.questionNum].theQuestion);
                gameObj.response1.text(TriviaQuestions[gameObj.questionNum].opt1);
                gameObj.response2.text(TriviaQuestions[gameObj.questionNum].opt2);
                gameObj.response3.text(TriviaQuestions[gameObj.questionNum].opt3);
                gameObj.response4.text(TriviaQuestions[gameObj.questionNum].opt4);
                questionTimeout = setTimeout( function() {
                    noGuess();
                }, 5000 );
            }
            else {
                gameObj.gameOver = true;
                gameOverClip.play();
                gameObj.questionDisplay.html("<span class='answer-text'>Game Over</span>" + 
                // "<p>Questions Asked: " + numQuestions + "</p>" + 
                "<p>Correct answers: " + gameObj.correct + "</p>" + 
                "<p>Wrong answers: " + gameObj.wrong + "</p>" + 
                "<p>Questions missed: " + gameObj.noAnswer + "</p>" 
                );
                gameObj.answerButtons.hide();
                gameObj.startButton.text("Play Again!");
                gameObj.startButton.show();
            }
        }
    }

    function checkGuess(myGuess) {
        if (!answerTimeout) {
            clearTimeout(questionTimeout);
            questionTimeout = undefined;
            if (myGuess === TriviaQuestions[gameObj.questionNum].correct) {
                console.log("You have chosen wisely.");
                gameObj.questionDisplay.html("<span class='answer-text'>You have chosen wisely.</span>");
                gameObj.correct++;
            }
            else {
                gameObj.questionDisplay.html("<span class='answer-text'>You have chosen poorly.</span>");
                console.log("You have chosen poorly.");
                gameObj.wrong++
            }
            answerTimeout = setTimeout(getQuestion, 3000);
        }
    }

    function noGuess() {
        if (!answerTimeout) {
            questionTimeout = undefined;
            gameObj.questionDisplay.html("<span class='answer-text'>You're out of time for this one.</span>");
            console.log("Time is up!");
            gameObj.noAnswer++;
        }
        answerTimeout = setTimeout(getQuestion, 3000);
    }









});

function shuffle (array) {
    // returns a shuffled array, does not keep the original, unshuffled array
    var currentIndex = array.length;
    var tempValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

