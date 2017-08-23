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


$(".signup").on("click", function (event) {

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

});

var provider = new firebase.auth.GoogleAuthProvider();

$(".google").on("click", function googleSignin(event)  {
    event.preventDefault();

    auth
        .signInWithPopup(provider).then(function(googleUser) {
        var token = googleUser.credential.accessToken;
        var user = googleUser.user;

        console.log(googleUser)

        var ref = db.ref("usersGoogle");

        var data = {
            email: googleUser.user.email,
            id: googleUser.user.uid
        };

        ref.push(data)

        console.log(token)
        console.log(user)
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
    });



    console.log("google sign in")
});

$(".googleout").on("click", function googleSignout(event)  {
    event.preventDefault();
    auth.signOut()

        .then(function() {
            console.log('Signout Succesfull')
        }, function(error) {
            console.log('Signout Failed')
        });
    console.log("google sign in")
});