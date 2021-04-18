let mapParis, infoWindow;

function initParisMap() {
    mapParis = new google.maps.Map(
        document.getElementById("mapParis"), {
        center: { lat: 48.856614, lng: 2.3522219 },
        zoom: 12,
    });
    /* Les données JSON sont récupérées dans la variable restaurants sous forme de tableau  */
    /* 1ère étape : récupérer les coordonnées de chaque restaurant */

    for (let i = 0; i < restaurants.length; i++) {
        //restaurantCoords.push(restaurants[i].lat,restaurants[i].long);
        //console.log(restaurants[i]);
        /* 2nde étape : distribuer pour chaque restaurant un marqueur en fonction de ses coordonnnées */
        const latLng = new google.maps.LatLng(restaurants[i].lat, restaurants[i].long);
        new google.maps.Marker({
            position: latLng,
            map: mapParis,
        });
    }
/* se placer sur la carte en fonction de geolocalisation */
infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Se déplacer sur votre position actuelle";
  locationButton.classList.add("custom-map-control-button");
  mapParis.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Localisation trouvée.");
          infoWindow.open(mapParis);
          mapParis.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, mapParis.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, mapParis.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(mapParis);
}
