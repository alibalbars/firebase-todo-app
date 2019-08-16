document.getElementById("lbl_out1").style.display = 'none';
document.getElementById("lbl_out2").style.display = 'none';
document.getElementById("lbl_con").style.display = 'none';
document.getElementById("lbl_error").style.display = 'none';
document.getElementById("flag_turkey").style.display = 'none';


document.querySelector('#apibutton').addEventListener('click', action());

document.querySelector('input[type="text"]').addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        action();
    }
});,
    
function action() {
    var online = navigator.onLine;
    if (!online) { // internet yoksa
        document.getElementById("lbl_out1").style.display = 'none';
        document.getElementById("lbl_out2").style.display = 'none';
        document.getElementById("lbl_error").style.display = 'none';
        document.getElementById("lbl_con").style.display = 'block';
    } else {
        document.getElementById("lbl_con").style.display = 'none';
        var havadurumu_text = document.querySelector('#havadurumutext').value;
        if (havadurumu_text == "") {
            document.getElementById("lbl_error").style.display = 'block';
            document.getElementById("lbl_out1").style.display = 'none';
            document.getElementById("lbl_out2").style.display = 'none';
            document.getElementById("flag_turkey").style.display = 'none';
        }
        var apiAdres = 'https://api.openweathermap.org/data/2.5/weather?q=' + havadurumu_text + '&APPID=6ba3cc27ff26cfb1f436bdf90d7bf032&units=metric'

        const connect = new XMLHttpRequest();
        connect.open("GET", apiAdres);

        connect.onload = function () {

            if (this.status == 404) {
                document.getElementById("lbl_out1").style.display = 'none';
                document.getElementById("lbl_out2").style.display = 'none';
                document.getElementById("lbl_error").style.display = 'block';

            } else if (this.status == 200) {
                var response = JSON.parse(this.response);
                console.log(response);
                console.log('Sıcaklık: ' + response.main.temp);
                console.log(response.weather[0].main);
                console.log('Nem: % ' + response.main.humidity);
                document.getElementById("lbl_out1").innerHTML = response.name + ', ' + response.sys.country + '<hr>';
                document.getElementById("lbl_out2").innerHTML = 'Sıcaklık: ' + response.main.temp + ' °C' + '<br>' +
                    'Durum: ' + response.weather[0].main + '<br>' +
                    'Nem:  ' + response.main.humidity + ' %';

                if (response.sys.country == "TR") {
                    document.getElementById("flag_turkey").style.display = 'block';
                } else {
                    document.getElementById("flag_turkey").style.display = 'none';
                }


                document.getElementById("lbl_error").style.display = 'none';
                document.getElementById("lbl_out1").style.display = 'block';
                document.getElementById("lbl_out2").style.display = 'block';

            }
        }
        connect.send();
    }
}
