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

var auth = firebase.auth();

var db = firebase.database();


$("button").on("click", function (event) {

    event.preventDefault();

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();

    var user = auth.createUserWithEmailAndPassword(email, password);

    user
        .then(function (userCreated) {
            console.log(userCreated)
            console.log("new user created")

            var ref = db.ref("users");

            var data = {
                email: userCreated.email,
                id: userCreated.uid
            };

            ref.push(data)

        })
        .catch(function (err) {
            alert(err.message)
            console.log("There was an error, try again")
        });

    console.log(email, password)

})