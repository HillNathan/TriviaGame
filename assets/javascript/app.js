$(document).ready(function() {

    var myArray = [];
    for (i=0; i<TriviaQuestions.length; i++) {
        myArray.push(i);
    }
    console.log(myArray);

    shuffle(myArray);

    $(".start-button").click(function() {
        console.log(myArray.pop());
        console.log(myArray);
    });
    $("#button-1").click(function() {
        alert("Button 1");
    })
    $("#button-2").click(function() {
        alert("Button 2");
    })
    $("#button-3").click(function() {
        alert("Button 3");
    })
    $("#button-4").click(function() {
        alert("Button 4");
    })





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