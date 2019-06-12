$(document).ready(function() {

    var gameObj = {
        questionDisplay: $("#display-div"),
        questionNum: 0,
    }

    var questionTimeout;
    var answerTimeout;
    var numQuestions = 0;
    var correct = 0;
    var wrong = 0;
    var noAnswer = 0;
    var response1 = $("#button-1");
    var response2 = $("#button-2");
    var response3 = $("#button-3");
    var response4 = $("#button-4");


    var questionOrder = [];
    for (i=0; i<TriviaQuestions.length; i++) {
        questionOrder.push(i);
    }
    shuffle(questionOrder);
    numQuestions = questionOrder.length;

    $(".start-button").click(function() {
        getQuestion();
    });

    response1.click(function() {
        checkGuess(this.value); 
    })
    response2.click(function() {
        checkGuess(this.value);
    })
    response3.click(function() {
        checkGuess(this.value);
    })
    response4.click(function() {
        checkGuess(this.value);
    })

    function getQuestion() {    
        if (!questionTimeout) {
            answerTimeout = undefined;
            $(".response-btn").show();
            if (questionOrder.length !== 0) {
                gameObj.questionNum = questionOrder.pop()
                gameObj.questionDisplay.html(TriviaQuestions[gameObj.questionNum].theQuestion);
                response1.text(TriviaQuestions[gameObj.questionNum].opt1);
                response2.text(TriviaQuestions[gameObj.questionNum].opt2);
                response3.text(TriviaQuestions[gameObj.questionNum].opt3);
                response4.text(TriviaQuestions[gameObj.questionNum].opt4);
                questionTimeout = setTimeout( function() {
                    noGuess();
                }, 5000 );
            }
            else {
                gameObj.questionDisplay.html("<span class='answer-text'>Game Over</span>" + 
                // "<p>Questions Asked: " + numQuestions + "</p>" + 
                "<p>Correct answers: " + correct + "</p>" + 
                "<p>Wrong answers: " + wrong + "</p>" + 
                "<p>Questions missed: " + noAnswer + "</p>" + 
                "<br><button class='start-button btn btn-lg sedgwick' id='play-again'>Play again!</button>"
                );
                $(".response-btn").hide();
            }
        }
    }

    function checkGuess(myGuess) {
        if (!answerTimeout) {
            clearTimeout(questionTimeout);
            questionTimeout = undefined;
            if (myGuess === TriviaQuestions[gameObj.questionNum].correct) {
                console.log("You have chosen wisely.");
                // questionDisplay.empty();
                gameObj.questionDisplay.html("<span class='answer-text'>You have chosen wisely.</span>");
                correct++;
            }
            else {
                gameObj.questionDisplay.html("<span class='answer-text'>You have chosen poorly.</span>");
                console.log("You have chosen poorly.");
                wrong++
            }
            answerTimeout = setTimeout(getQuestion, 3000);
        }
    }

    function noGuess() {
        if (!answerTimeout) {
            questionTimeout = undefined;
            questionDisplay.html("<span class='answer-text'>You're out of time for this one.</span>");
            console.log("Time is up!");
            noAnswer++;
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

