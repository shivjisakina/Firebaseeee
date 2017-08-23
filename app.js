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

// Facebook auth
window.fbAsyncInit = function () {
    FB.init({
        appId: '454886654904249',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// ================================================
// User signup
// ================================================


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

// ================================================
// Google
// ================================================

var provider = new firebase.auth.GoogleAuthProvider();

$(".google").on("click", function googleSignin(event) {
    event.preventDefault();

    auth
        .signInWithPopup(provider).then(function (googleUser) {
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
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
    });


    console.log("google sign in")
});

$(".googleout").on("click", function googleSignout(event) {
    event.preventDefault();
    auth.signOut()

        .then(function () {
            console.log('Signout Succesfull')
        }, function (error) {
            console.log('Signout Failed')
        });
    console.log("google sign in")
});

// ================================================
// Facebook
// ================================================

var providerfb = new firebase.auth.FacebookAuthProvider();


$(".facebook").on("click", function facebookSignin(event) {
    event.preventDefault();
    firebase.auth().signInWithPopup(providerfb)

        .then(function (fbUser) {

            var token = fbUser.credential.accessToken;
            var user = fbUser.user;

            console.log(fbUser)

            var ref = db.ref("usersFacebook");

            var data = {
                name: fbUser.user.displayName,
                email: fbUser.user.email,
                id: fbUser.user.uid
            };

            ref.push(data)

            console.log(token)
            console.log(user)

        }).catch(function (error) {

        console.log(error.code);
        console.log(error.message);
    });
    console.log("facebook sign in")
});

$(".facebookout").on("click", function facebookSignout(event) {
    event.preventDefault();
    firebase.auth().signOut()

        .then(function () {
            console.log('Signout successful!')
        }, function (error) {
            console.log('Signout failed')
        });
    console.log("facebook sign in")
});

// ================================================
// Github
// ================================================

var providerGithub = new firebase.auth.GithubAuthProvider();


$(".github").on("click", function facebookSignout(event) {
    event.preventDefault();
    firebase.auth().signInWithPopup(providerGithub)

        .then(function (githubUser) {
            var token = githubUser.credential.accessToken;
            var user = githubUser.user;

            console.log(githubUser)

            var ref = db.ref("usersGithub");

            var data = {
                name: githubUser.user.displayName,
                id: githubUser.user.uid
            };

            ref.push(data)

            console.log(token)
            console.log(user)
        }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
    });
    console.log("github sign in")
});

$(".githubout").on("click", function facebookSignout(event) {
    event.preventDefault();
    firebase.auth().signOut()

        .then(function () {
            console.log('Signout successful!')
        }, function (error) {
            console.log('Signout failed')
        });
    console.log("github sign out")
});

// ================================================
// Creating Random Databases for practice
// ================================================

var playersRef = firebase.database().ref("players/");

playersRef.set ({
    John: {
        number: 1,
        age: 30
    },

    Amanda: {
        number: 2,
        age: 20
    }
});

var foodRef = firebase.database().ref("food");

foodRef.set({
    breakfast: {
        protein: "93 grams",
        fats: "13 grams",
        sodium: "10 grams"
    },
    lunch: {
        protein: "43 grams",
        fats: "93 grams",
        sodium: "7 grams"
    },
    dinner: {
        protein: "19 grams",
        fats: "45 grams",
        sodium: "6 grams"
    }
})

$(".createElectronics").on("click", function facebookSignout(event) {
    event.preventDefault();

    var electronicsRef = firebase.database().ref("Electronics");

    electronicsRef.set({
        phone: "iphone 6s",
        laptop: "Macbook pro 13 inch"
    })

    console.log("database created")
});

$(".createDrinks").on("click", function facebookSignout(event) {
    event.preventDefault();

    var drinksRef = firebase.database().ref("Drinks");

    var drink = $("#drink").val().trim();
    var brand = $("#brand").val().trim();

    drinksRef.set({
        drink: drink,
        brand: brand
    })

    console.log("database created")
});

