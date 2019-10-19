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

    $("#loginBtn").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();

        //bu bir promise, bu yüzden then ve catch ile kullanılır.
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                window.location.href = "index.html";
            }).catch(function (error) {
                var msg = "";
                switch (error.message) {
                    case "There is no user record corresponding to this identifier. The user may have been deleted.":
                        msg = "Kullanıcı bulunamadı!"; break;

                    case "The email address is badly formatted.":
                        msg = "Hatalı email adresi!"; break;

                    case "The password is invalid or the user does not have a password.":
                        msg = "Geçersiz şifre!"; break;

                    default:
                        msg = "Farklı bir hata!";
                }

                alert(msg);
            })
    })
})