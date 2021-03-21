let map;
let restaurantCoords = [];
let selectedCoords = []; 

/* const initParisMap = () => {
    map =  new google.maps.Map(
        document.getElementById("mapParis"), {
            center: { lat: 48.856614, lng: 2.3522219 },
            zoom: 8,
        }
    )
} */

//initParisMap();

function initParisMap() {
    map =  new google.maps.Map(
        document.getElementById("mapParis"), {
            center: { lat: 48.856614, lng: 2.3522219 },
            zoom: 12,
});
/* Les données JSON sont récupérées dans la variable restaurants sous forme de tableau  */
/* 1ère étape : récupérer les coordonnées de chaque restaurant */

for (let i =0; i < restaurants.length; i++) {
    restaurantCoords.push(restaurants[i].lat,restaurants[i].long);
    console.log (restaurantCoords, typeof(restaurantCoords));
    /* 2nde étape : distribuer pour chaque restaurant un marqueur en fonction de ses coordonnnées */
    const latLng = new google.maps.LatLng(restaurantCoords[0], restaurantCoords[1]);
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    
}


}
