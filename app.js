console.log("Hello World")

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDEj5pVnkQr38EoOTHA-0uX5u0TfJO-WoE",
    authDomain: "testing-sakina.firebaseapp.com",
    databaseURL: "https://testing-sakina.firebaseio.com",
    projectId: "testing-sakina",
    storageBucket: "",
    messagingSenderId: "484303247887"
};
firebase.initializeApp(config);

var auth = firebase.auth;

$("button").on("click",function (event) {

    event.preventDefault();

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();

    var user = firebase.auth().createUserWithEmailAndPassword(email, password);

        user
        .then(function (userCreated) {

            console.log(userCreated)

        })
        .catch(function (err) {

            console.log(err)

        });

    console.log(email, password)

})