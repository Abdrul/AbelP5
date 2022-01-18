
const CLEFAPI = '6cda37f50b18ff9d9c3f23c6ed8e2a00';
let resultatsAPI;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert('Vous avez refusé la géolocalisation, veuillez accepter')
    })
}

function AppelAPI(long,lat) {
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);
    })
}