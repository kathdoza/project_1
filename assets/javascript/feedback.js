// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAyeRmzjdQiHl9D7aSjX4JktJs-K6y02I",
    authDomain: "in-or-out-75042.firebaseapp.com",
    databaseURL: "https://in-or-out-75042.firebaseio.com",
    projectId: "in-or-out-75042",
    storageBucket: "in-or-out-75042.appspot.com",
    messagingSenderId: "716018681650"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
var name = "";
var feedback = "";

// Capture Button Click
    $("#submit-button").on("click", function (event) {
    event.preventDefault();

        var name = $("#name-input").val().trim();
        var feedback = $("#feedback-input").val().trim();

        database.ref().set({
        name: name,
        feedback: feedback,

    });

    database.ref().on("value", function (snapshot) {

    // Print the initial data to the console.
        console.log(snapshot.val());

        // Log the value of the various properties
        console.log(snapshot.val().name);
        console.log(snapshot.val().feedback);

        // Output all of the new information into the relevant HTML sections
        $("#name-display").text(name);
        $("#feedback-display").text(feedback);

        // Change the HTML
        $("#displayed-data").text(snapshot.val().name + " | " + snapshot.val().feedback);

        // If any errors are experienced, log them to console.
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);


    });

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear form
    document.getElementById('feedbackForm').reset();


});