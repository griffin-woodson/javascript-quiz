//Variables for the intro page logic
var introSection = document.querySelector("#intro-section");
var introH1 = introSection.querySelector("h1");
var introP = introSection.querySelector("p");
var startButton = introSection.querySelector("button");
var highScoresButton = document.querySelector("#high-scores-button");

//Variables for the end screen logic
var endScreen = document.querySelector("#end-section");

// Variables for the high score screen logic
var highScoresSection = document.querySelector("#high-scores-section");
var highScores = [];

// Variables for the quiz element logic
var quizSection = document.querySelector("#quiz-section");
var mainPage = document.querySelector("main");
var questionCounter = 1;
var timer = document.querySelector("#timer");
var timeValue = 100;

// Quiz questions object, which contains 15 question objects, each with a question string, an answers array of strings, and a correct answer, which is an index of the answers array
var quizQuestions = [
    question1 = {
        number: 1,
        question: "In a CSS stylesheet, what kind of selector is represented by '.'?",
        answers: ["element", "class", "universal", "id"],
        correct: "class"
    },
    question2 = {
        number: 2,
        question: "In the following array, how might you access the letter 'a'?\nvar array = ['a', 'b', 'c', 'd']",
        answers: ["array.'a'", "array[1]", "array[0]", "array: a"],
        correct: "array[0]"
    },
    question3 = {
        number: 3,
        question: "What programming language is used to style webpages?",
        answers: ["Java", "CSS", "Javascript", "HTML"],
        correct: "CSS"
    },
    question4 = {
        number: 4,
        question: "Which of the following operators would return false? \nif(0 ___ 0) {};",
        answers: ["==", "===", "<=", "!="],
        correct: "!="
    },
    question5 = {
        number: 5,
        question: "How would you access the 'length' property of an array using JavaScript?",
        answers: ["array.length()", "array.length", "len(array)", "array[].length"],
        correct: "array.length"
    },
    question6 = {
        number: 6,
        question: "Which attribute should every <img> element have?",
        answers: ["background-position", "img", "alt", "id"],
        correct: "alt"
    },
    question7 = {
        number: 7,
        question: "What is the method that appends an item to the end of a JavaScript array?",
        answers: ["array.push()", "array.pushItem()", "array.append()", "array.add()"],
        correct: "array.push()"
    },
    question8 = {
        number: 8,
        question: "What does the && comparison operator do?",
        answers: ["Checks whether two expressions are both true", "Checks whether two expressions are both false", "Checks whether two expressions are strictly equal", "Checks whether either of two expressions are true"],
        correct: "Checks whether two expressions are both true"
    },
    question9 = {
        number: 9,
        question: "Which of the following operators is strict comparison?",
        answers: ["=", "==", "===", "!="],
        correct: "==="
    },
    question10 = {
        number: 10,
        question: "What method will allow form submission on a webpage to be handled by JavaScript?",
        answers: [".preventDefault()", ".allow()", ".javaHandler()", ".formAllow()"],
        correct: ".preventDefault()"
    },
    question11 = {
        number: 11,
        question: "Which git command creates and checks out into a new branch?",
        answers: ["git checkout new", "git checkout -b", "git branch checkout", "git checkout new branch"],
        correct: "git checkout -b"
    },
];

// Function to toggle the display of the intro page
var toggleIntro = function() {
    if (introSection.style.display === "none") {
        introSection.style.display = "flex";    
    }
    else {
        introSection.style.display = "none";
    }
}

var startQuiz = function() {

    // Reset questionCounter
    questionCounter = 1;

    // Toggle display of both the intro and the quiz sections
    introSection.style.display = "none";
    endScreen.style.display = "none";
    highScoresSection.style.display = "none"
    quizSection.style.display = "flex";

    // Set timer
    timeValue = 100;
    
    setInterval(function() {
        timer.textContent = "Time: "+timeValue;
        timeValue--;
        if (timeValue <= 0) {
            clearInterval();
            timeValue = 0;
            endQuiz();
        }
    }, 1000);

    // Loop through the questions and display the current question
    for (var i = 0; i < quizQuestions.length; i++) {
        if (quizQuestions[i].number == questionCounter) {
            questionObj = quizQuestions[i];
            showQuestion(questionObj);
        }
    }
}

// Function to add quiz elements to the page
var showQuestion = function(questionObj) {
    // Takes an object from the quizQuestions object as a parameter and creates elements to display to the screen with its attributes

    // Check whether the elements already exist
    if (document.querySelector(".answer") === null) {

        // Create and append the question h3 element to the quiz section
        var quizQuestionEl = document.createElement("h2");
        quizQuestionEl.textContent = questionObj.question;
        quizSection.appendChild(quizQuestionEl);

        // Create and append the 4 answer elements to an ol element inside quiz section with class answer-list
        var answerList = document.createElement("ol");
        answerList.className = "answer-list";
        quizSection.appendChild(answerList);

        for (var i = 0; i < questionObj.answers.length; i++) {
            var answer = document.createElement("li");
            answer.textContent = questionObj.answers[i];
            answer.className = "answer";
            answerList.appendChild(answer);
        }

        // Event listener to call nextQuestion only when we are not on the last question
        if (questionObj.number == quizQuestions.length) {
        }
        else {
            answerList.addEventListener("click", nextQuestion);
        }
    }
    // If they already exist, don't do anything
}

// Function that progresses to the next quiz question
var nextQuestion = function(event) {

    if (questionCounter != quizQuestions.length) {
        if (event.target.getAttribute("class") === "answer") {

            // Iterate through the quizQuestions array and find the object that matches, assign it to var questionObj
            var quizAnswers = document.getElementsByTagName("li");
    
            // Loop through the li elements and find the one that event corresponds with
            answerIndex = 0;
            for (var i = 0; i < quizAnswers.length; i++) {
                if (event.target.textContent === quizAnswers[i].textContent) {
                    answerIndex = i;
                }
            }
    
            var questionObj = {};
    
            // Check whether each of the answers in the <li> element matches any of the answers in the quizQuestions in the array
            for (var i = 0; i < quizQuestions.length; i++) {
                if (quizAnswers[0].textContent === quizQuestions[i].answers[0] && quizAnswers[1].textContent === quizQuestions[i].answers[1]) {
                    // Assign questionObj to the next question obj
                    questionObj = quizQuestions[i];
                    nextQuestionObj = quizQuestions[i + 1];
                }
            }
    
            // Select the question and update its text content
            var quizQuestionEl = document.querySelector("h2");
            quizQuestionEl.textContent = nextQuestionObj.question;
    
    
            // Update the textContent for each of the 4 answer elements
            for (var i = 0; i < quizAnswers.length; i++) {
                quizAnswers[i].textContent = nextQuestionObj.answers[i]; 
            }
    
            // Check the user's selected answer against the correct answer and display message below. Decrement time/score if the user selected an incorrect answer
            correctIndex = 0;
    
            for (var i = 0; i < questionObj.answers.length; i++) {
                if (questionObj.answers[i] === questionObj.correct) {
                    correctIndex = i;
                }
            }
            checkAnswer(answerIndex, correctIndex);
        }
    }
    // If this is the last quiz question, call the endQuiz function
    else {
        endQuiz();
    } 
}

var checkAnswer = function(guess, answer) {

    var message = mainPage.querySelector("h3");

    // Check whether the main page already has an h3 element
    if (mainPage.querySelector("h3") === null) {
        message = document.createElement("h3");
    };

    // Define the messages to display on true/false conditions
    var correctMessage = "Correct!";
    var incorrectMessage = "Incorrect.";

    // Compare guess against answer
    if (guess === answer) {
        // Define elements and methods that will display messages
        message.textContent = correctMessage;
        message.className = "message";
        mainPage.appendChild(message);

        // Do not decrement time
    }

    else {
        message.textContent = incorrectMessage;
        message.className = "message";
        mainPage.appendChild(message);

        // Decrement the time element
        timeValue -= 10;
        timer.textContent = "Time: "+timeValue;
    }

    // Once user has checked answer, increment the questionCounter
    questionCounter++;
}


// Function to toggle visibility of the quiz questions section
var toggleQuestions = function() {
    if (quizSection.style.display === "none") {
        quizSection.style.display = "flex";    
    }
    else {
        quizSection.style.display = "none";
    }
}

var toggleEndScreen = function() {
    if (endScreen.style.display === "none") {
        endScreen.style.display = "flex";    
    }
    else {
        endScreen.style.display = "none";
    }
}

var endQuiz = function() {
    // Clear the quiz answer elements from the display
    introSection.style.display = "none";
    quizSection.style.display = "none";
    endScreen.style.display = "flex";

    // Check that endQuiz elements don't already exist
    if (endScreen.querySelector("button") === null) {
        
        // Define elements to show in their place
        endTitle = document.createElement("h2");
        endTitle.textContent = "All Done!"

        endScore = document.createElement("p");
        endScore.textContent = "Your final score is: "+timeValue;

        scoreForm = document.createElement("form");
        nameLabel = document.createElement("label");
        nameLabel.textContent = "Enter your name";
        nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");

        buttonDiv = document.createElement("div");
        retyButton = document.createElement("button");
        retyButton.textContent = "Retry";
        submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.textContent = "Submit Score";

        endScreen.appendChild(endTitle);
        endScreen.appendChild(endScore);
        endScreen.appendChild(scoreForm);
        endScreen.appendChild(buttonDiv);

        scoreForm.appendChild(nameLabel);
        scoreForm.appendChild(nameInput);
        scoreForm.appendChild(buttonDiv);

        buttonDiv.appendChild(retyButton);
        buttonDiv.appendChild(submitButton);

        submitButton.addEventListener("click", submitScores);
        retyButton.addEventListener("click", startQuiz);
    }   
}

var submitScores = function(event) {
    event.preventDefault();
    // Take the form submission
    var scoreName = document.querySelector("input").value;
    var userScore = timeValue;

    //Append that data to the highScores
    highScores.push({name: scoreName, score: userScore});

    // Ensure the values of high scores are appended to localStorage
    localStorage.setItem("high-scores", JSON.stringify(highScores));

    viewHighScores(event);
}

var viewHighScores = function(event) {

    event.preventDefault();

    // Load the high scores display
    toggleHighScores();

    // Check to see whether the high scores section already contains elements
    if (highScoresSection.querySelector("#go-back-button") === null) {
        // Create title element
        var scoresTitle = document.createElement("h2");
        scoresTitle.textContent = "High Scores";

        scoresList = document.createElement("ul");

        // Pull the data from the localStorage object and load it into highScores
        highScores = JSON.parse(localStorage.getItem("high-scores"));

        // Append a new child for every entry within the highScores array
        for (var i = 0; i < highScores.length; i++) {
            var newScore = document.createElement("li");
            newScore.textContent = highScores[i].name+": "+highScores[i].score;
            scoresList.appendChild(newScore);
        }

        // Create div and buttons
        var scoresButton = document.createElement("div");
        var goBackButton = document.createElement("button");
        goBackButton.setAttribute("id", "go-back-button");
        var clearScoresButton = document.createElement("button");
        clearScoresButton.setAttribute("id", "clear-scores-button");
        goBackButton.textContent = "Go Back";
        clearScoresButton.textContent = "Clear Scores";

        // Append to the div
        scoresButton.appendChild(goBackButton);
        scoresButton.appendChild(clearScoresButton);

        // Append the items to the high score screen
        highScoresSection.appendChild(scoresTitle);
        highScoresSection.appendChild(scoresList);
        highScoresSection.appendChild(scoresButton);

        // Event listeners for the goBackButton and clearScoresButtons
        if (questionCounter != quizQuestions.length) {

            goBackButton.addEventListener("click", toggleHighScores);
        }
        else {
            goBackButton.addEventListener("click", startQuiz);
            endScreen.style.display = "none";
        }
        clearScoresButton.addEventListener("click", clearScores);

    }
    else {
        // Modify the textContent of the existing elements
        for (var i = 0; i < highScores.length; i++) {
            let scoresList = document.getElementsByTagName("li");
            scoresList[i].textContent = highScores[i].name+" "+highScores[i].score;
        }
    }
}

// Toggle high scores and return to previous screen on click of goBackButton
var toggleHighScores = function() {

    // Hide the endScreen if it has popped up from ending the quiz
    if (endScreen.style.display != "none") {
        endScreen.style.display = "none";
    }

    if (highScoresSection.style.display === "flex") {
        highScoresSection.style.display = "none";
        highScoresSection.style.position = "relative";
        highScoresSection.style.zIndex = "0";
    }
    else {
        // Allow the high scores screen to be brought forward with z-index and change its styles to cover the other sections
        highScoresSection.style.display = "flex";
        highScoresSection.style.position = "fixed";
        highScoresSection.style.top = "0";
        highScoresSection.style.left = "10%";
        highScoresSection.style.width = "80%";
        highScoresSection.style.backgroundColor = "white";
        highScoresSection.style.height = "600px";
        highScoresSection.style.zIndex = "2";
    }
}

// Clear scores from array
var clearScores = function() {
    for (var i = 0; i < highScores.length; i++) {
        highScores[i].name = "";
        highScores[i].score = ""
    }

    // Change the textContent to reflect the empty values
    for (var i = 0; i < highScores.length; i++) {
        let scoresList = document.getElementsByTagName("li");
        scoresList[i].textContent = "";
    }
}

// Event listeners for the intro page
startButton.addEventListener("click", startQuiz);

// Event listeners for the high scores button
highScoresButton.addEventListener("click", viewHighScores);