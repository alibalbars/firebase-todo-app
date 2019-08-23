const headerImage = document.querySelector('#headerImage');
const btnTamam = document.querySelector('#btnTamam');
const inputPlace = document.querySelector('#inputPlace');
const infoPlace = document.querySelector('#infoPlace');
const infoWeather1 = document.querySelector('#infoWeather1');
const imgFlag = document.querySelector('#imgFlag');
const imgWeather = document.querySelector('#imgWeather');
const divResult1 = document.querySelector('#divResult1');
const loader = document.querySelector('.loader');


inputPlace.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        start();
    }
});

function start() {
    divResult1.style.visibility = 'hidden';
    loader.style.visibility = 'visible';
    bringResult1();
    setTimeout(function () {
        loader.style.visibility = 'hidden';
        divResult1.style.visibility = 'visible';
        divResult1.classList.remove('divResult1');
        divResult1.clientHeight;
        divResult1.classList.add('divResult1');
    }, 200);
    


}

function bringResult1() {
    if (inputPlace.value == '') {
        console.log('Geçersiz giriş!');
    }
    else {
        var xhr = new XMLHttpRequest();
        var URL1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputPlace.value + '&APPID=6ba3cc27ff26cfb1f436bdf90d7bf032&units=metric&lang=tr';
        xhr.open('GET', URL1);
        xhr.onload = function () {
            if (this.status == 200) {

                var resp = JSON.parse(this.response);
                imgFlag.src = 'https://www.countryflags.io/' + resp.sys.country + '/shiny/64.png';
                imgWeather.src = 'http://openweathermap.org/img/wn/' + resp.weather[0].icon + '@2x.png';
                console.log(resp);
                infoPlace.innerHTML = resp.name + ', ' + resp.sys.country;
                infoWeather1.innerHTML = 'Sıcaklık: ' + resp.main.temp + ' °C <br>' +
                    'Nem: ' + resp.main.humidity + ' % <br>' +
                    ' ' + resp.weather[0].description.charAt(0).toUpperCase() +
                    resp.weather[0].description.slice(1);

            }
            else if (this.status == 404) {

            }
        }
        xhr.send();
    }

}
function imageLoad() {
    console.log('resim yüklendi');
    headerImage.classList.remove('image');
    headerImage.clientHeight;
    headerImage.classList.add('image');
}

btnTamam.onmouseover = function () {
    btnTamam.classList.remove('btnAnim2');
    btnTamam.classList.add('btnAnim1');
};

btnTamam.onmouseout = function () {
    btnTamam.classList.remove('btnAnim1');
    btnTamam.classList.add('btnAnim2');
};

btnTamam.addEventListener('click', function () {
    start();
})
