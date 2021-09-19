let map, infoWindow;
let markers = [];

function initParisMap() {
    map = new google.maps.Map(
        document.getElementById("map"), {
        center: { lat: 48.856614, lng: 2.3522219 },
        zoom: 12,
    });
    /* Les données JSON sont récupérées dans la variable restaurants sous forme de tableau  */
    /* 1ère étape : récupérer les coordonnées de chaque restaurant */

    for (let i = 0; i < restaurants.length; i++) {
      
        /* 2nde étape : distribuer pour chaque restaurant un marqueur en fonction de ses coordonnnées */
        const latLng = new google.maps.LatLng(restaurants[i].lat, restaurants[i].long);
        const marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title:restaurants[i].restaurantName,
            //content, seulement sur infoWindow ?
            content: `<p>TRST</p>`,
            
            id: "markerId_"+ i,  // => ajoute sur chaque marqueur l'id markerId_0, markerId_2 ...
        });
        /* TODO ajouter classe "hide" sur chaque marqueur */

        //markers.push(marker)        
    }
    //console.log(markers[2].id)

    /* 3 ème étape : afficher les restaurants sur un rayon de 500 m depuis un lieu fixé (location) avec google Places*/
    
    //définir la requête
    const request = {
      location: map,
      radius: '500',
      fields: ["name", "geometry", "opening_hours", "icon", "photo"],
      type: ['restaurant']
    };
    //afficher la requête
   service = new google.maps.places.PlacesService(map);
 service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });

  //Ajouter nouveau marker en cliquant sur la carte
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });
  }



/* 4 ème étape : se placer sur la carte en fonction de geolocalisation */
infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Se déplacer sur votre position actuelle";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
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
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  return markers
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}