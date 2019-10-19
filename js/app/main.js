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
    var current_user = "";

    //login ise user dolar
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) { // kullanıcı login ise
            current_user = user.uid;
            $(".user-text").text(user.email)
            $("#logout").click(function () {
                firebase.auth().signOut()
                    .then(function () {
                        window.location.href = "login.html";
                    })
            })

            $("#description").keyup(function (e) {
                var code = e.which;
                if (code == 13){
                    clickEvent();
                }
            })

            $(".sendToFireBase").click(clickEvent);

            function clickEvent() {
                var description = $("#description").val();
                if (description.trim() != "") {
                    firebase.database().ref().child("users").child(current_user).child("todos").push(
                        {
                            description: description,
                            completed: false
                        }
                    );

                    $("#description").val("");
                }
            }
            //ref bize en tepedeki elemanı verir.
            var todoRef = firebase.database().ref().child("users/" + current_user).child("todos");

            //value -> eklendiğinde silindiğinde değiştiğinde hepsinde, value hepsini kapsıyor
            //değerinde bi değişiklik olduğunda bu function çalışsın
            //snapshot ismi bize kalmış
            todoRef.on("value", function (snapshot) {
                var $parent = $(".todoList").children("tbody");
                $parent.html("");
                //array'in içerisindeki her bir elemanı item'ın içerisine at
                snapshot.forEach(function (item) {
                    var completed = item.val().completed == true ? "checked" : "";

                    var description_elem = "<td>" + item.val().description + "</td>";
                    var completed_elem = "<td class='text-center'><input data-key='" + item.key + "' type='checkbox' class='switchery-plugin' " + completed + "/></td>";
                    var removeBtn_elem = "<td class='text-center'><button data-key='" + item.key + "' class='btn btn-danger btn-block removeBtn'>Sil</button></td>";

                    $parent.append("<tr>" + description_elem + completed_elem + removeBtn_elem + "</tr>");
                })
                $(".switchery-plugin").each(function () {
                    new Switchery(this);
                })
            });

            $("body").on("click", ".removeBtn", function () {
                var $key = $(this).data("key");
                firebase.database().ref("users/" + current_user).child("todos").child($key).remove()
            })

            $("body").on("change", ".switchery-plugin", function () {
                var $completed = $(this).prop("checked");
                var $key = $(this).data("key");

                firebase.database().ref("users/" + current_user).child("todos").child($key).child("completed").set($completed)

            })

        }
    })


})






















