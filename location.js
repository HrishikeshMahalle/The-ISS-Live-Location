const header = document.querySelector('header');
const section = document.querySelector('section');

//Map ViewPoint
const mymap = L.map('mapid').setView([0, 0], 3);

//fetch ISS data
const url = "https://api.wheretheiss.at/v1/satellites/25544";

//fetch Map Tiles
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaHJpc2hpeCIsImEiOiJja2o2eWN6b3A2Y2U0MnZwZHJpOGJnMmZkIn0.dnCqq4nJ5grQhNCtKlVcrg'
}).addTo(mymap);

//Find Data on the map while including an custom ICON


var myIcon = L.icon({
    iconUrl: 'Image.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon : myIcon}).addTo(mymap);
 
const p1 = document.createElement('h1');
const p2 = document.createElement('h2');

let firstTime = true;
async function getData() {

    const response = await fetch(url);
    const data = await response.json();
    const {latitude, longitude} = data; // object Destructing
    marker.setLatLng([latitude, longitude]);
    if(firstTime){
        mymap.setView([latitude, longitude]);
        firstTime = false;
    }
   
    p1.textContent = 'latitude : ' + latitude;
    p2.textContent = 'longitude : ' + longitude;
   
    console.log(latitude);
    console.log(longitude);
    
}

section.appendChild(p1);
section.appendChild(p2);

setInterval(getData ,2000);