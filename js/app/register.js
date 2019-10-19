$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyByof-1QMTRVIaj7PjNpb4mUurxAoIjJEI",
        authDomain: "fir-todo-app-77492.firebaseapp.com",
        databaseURL: "https://fir-todo-app-77492.firebaseio.com",
        projectId: "fir-todo-app-77492",
        storageBucket: "fir-todo-app-77492.appspot.com",
        messagingSenderId: "1096926617433",
        appId: "1:1096926617433:web:731eb0074b8a1b5db2f648",
        measurementId: "G-EL0B769CPX"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();

    $("#registerBtn").click(function () {

        var email = $("#email").val();
        var password = $("#password").val();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(function () {
                        window.location.href = "main.html";
                    })

            }).catch(function (error) {
                alert(error.message);
            })

    })

})
