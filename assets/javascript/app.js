$(document).ready(function() {

    var gameObj = {
        // game obj to hold all of the elements of our game
        questionNum: 0,
        questionOrder: [],
        correct: 0,
        wrong: 0,
        noAnswer: 0,
        gameOver: true,

        // these are all of our display elements to be manipulated inside of our game
        questionDisplay: $("#display-div"),
        response1: $("#button-1"),
        response2: $("#button-2"),
        response3: $("#button-3"),
        response4: $("#button-4"),
        answerButtons: $(".response-btn"),
        startButton: $(".start-button"),

        resetGame: function() {
            // function to reset the game to it's original state and pick a new set of questions
            this.correct = 0;
            this.wrong = 0;
            this.noAnswer = 0;
            this.gameOver = false;
            this.questionOrder = [];
            this.questionNum = 0;

            // the code below selects 10 random questions from the number of questions we have in TriviaQuestions
            var notUnique = false;
            for (i=0; i<15; i++) {
                notUnique = false;
                do {     
                    // loops as long as the temp value is not unique. If temp is a unique value then it does not loop at all
                    var temp = Math.floor(Math.random() * TriviaQuestions.length)
                    notUnique = this.questionOrder.includes(temp);
                } while(notUnique);
                // add the unique value to the questions array
                this.questionOrder.push(temp);
            }
        }
    }

    // declare variables to be used as our timeouts. 
    var questionTimeout;
    var answerTimeout;

    // starts or restarts the game and goes and gets the first question
    gameObj.startButton.click(function() {
        if (gameObj.gameOver) {
            gameObj.resetGame();
        }
        getQuestion();
    });

    // set listening events for our response buttons 1 through 4. They all call the same function, 
    //   but passing their own unique value
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

    // this function gets the next question index from the randomized array we set at the beginning of the game, 
    //   pulls the info from the data file and displays the question and the responses. 
    function getQuestion() {   
        // check to make sure we're not already somehow in the question timeout by making sure it is undefined
        if (!questionTimeout) {
            // disable the intervening timeout from when we are showing the answer/response
            answerTimeout = undefined;
            // hide the starting button (if it isn't already hidden) and show the answer buttons (if they aren't already showing)
            gameObj.startButton.hide();
            gameObj.answerButtons.show();
            // check to make sure we still have a question in the array
            if (gameObj.questionOrder.length !== 0) {
                // if we do, pop the question number out - removing it from the array and eliminating the opportunity for it to 
                //   be asked again in error
                gameObj.questionNum = gameObj.questionOrder.pop()
                // update the screen to show the question and the possible answers
                gameObj.questionDisplay.html(TriviaQuestions[gameObj.questionNum].theQuestion);
                gameObj.response1.text(TriviaQuestions[gameObj.questionNum].opt1).attr("value", TriviaQuestions[gameObj.questionNum].opt1);
                gameObj.response2.text(TriviaQuestions[gameObj.questionNum].opt2).attr("value", TriviaQuestions[gameObj.questionNum].opt2);
                gameObj.response3.text(TriviaQuestions[gameObj.questionNum].opt3).attr("value", TriviaQuestions[gameObj.questionNum].opt3);
                gameObj.response4.text(TriviaQuestions[gameObj.questionNum].opt4).attr("value", TriviaQuestions[gameObj.questionNum].opt4);
                // set the timeout for the length of time we are giving to answer the trivia question, 
                questionTimeout = setTimeout( function() {
                    // response if there is no guess is the default answer if we get no response from the user.
                    noGuess();
                }, 15000 );  // timeout for 15 seconds
            }
            else {
                // if we have no questions in the array, the game is over, and the final tallies are displayed. 
                gameObj.gameOver = true;
                // gameOverClip.play();
                // display the user's number of correct answers, wrong answers, and missed answers(timeouts)
                gameObj.questionDisplay.html("<span class='answer-text'>Game Over</span>" + 
                "<p>Correct answers: " + gameObj.correct + "</p>" + 
                "<p>Wrong answers: " + gameObj.wrong + "</p>" + 
                "<p>Questions missed: " + gameObj.noAnswer + "</p>" 
                );
                // hide the answer buttons, and update the start button to show "Play again" and show it. 
                gameObj.answerButtons.hide();
                gameObj.startButton.text("Play Again!");
                gameObj.startButton.show();
            }
        }
    }

    function checkGuess(myGuess) {
        // make sure we're not already in an answer timeout
        if (!answerTimeout) {
            // clear the previous timeout and make it so it can' be double-called
            clearTimeout(questionTimeout);
            questionTimeout = undefined;
            // check the answer agains the correct answer
            if (myGuess === TriviaQuestions[gameObj.questionNum].correct) {
                // if the user is right, display a witty response saying so. 
                gameObj.questionDisplay.html("<span class='answer-text'>You have chosen wisely.</span>");
                gameObj.correct++; //increment correct answer counter
            }
            else {
                // if the user is incorrect, say so and then display the correct answer
                gameObj.questionDisplay.html("<span class='answer-text'>You have chosen poorly.</span>" +
                "<br><p>The correct answer was " + TriviaQuestions[gameObj.questionNum].correct + ".");
                console.log("You have chosen poorly.");
                gameObj.wrong++   //increment wrong answer counter
            }
            // set a three-second timeout to display the answer response, and then move on to the next question. 
            answerTimeout = setTimeout(getQuestion, 3000);
        }
    }

    function noGuess() {
        // default response from the question timeout, is only called if teh user doe not click a response before
        //   their timer runs out. 
        if (!answerTimeout) {
            // make it so the previous timeout cannot be called again
            questionTimeout = undefined;
            // display a response telling the user they ran out of time, and display the correct answer.
            gameObj.questionDisplay.html("<span class='answer-text'>You're out of time for this one.</span>" +
            "<br><p>The correct answer was " + TriviaQuestions[gameObj.questionNum].correct + ".");
            gameObj.noAnswer++;    //increment non-answer counter
        }
        // set a three-second timeout to display the answer response, and then move on to the next question. 
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

