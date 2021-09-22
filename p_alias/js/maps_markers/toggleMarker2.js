// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array : markers.
// The user can then click an option to hide, show or delete the markers.

let map, infoWindow;

let allAddedMarkers = [];

function createMarker(place) {
  const photos = place.photos;
  if (!photos || !place.geometry || !place.geometry.location) return;
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    title: place.name,
    //icon: photos[0].getUrl({maxWidth:55, maxHeight: 55})
        
  });
  google.maps.event.addListener(marker, "click", () => {
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(place.name);
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
}

function initMap() {
  const options = {
    zoom: 12,
    center: paris,
  };

  // The map, centered at Paris
  map = new google.maps.Map(document.getElementById("map"), options);

  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {
    let newMarker = {};
    addMarker({
      coords: event.latLng,
      content:
        "<p>Nouvelle adresse ? +</<p>" +
        JSON.stringify(event.latLng.toJSON(), null, 2) +
        `<p>${defaultStars}</p>`,
      iconImage: `${defaultIcon}`,
      ratings: [
        {
          comment: "moui3",
          //ce qui est envoyé comme moyenne default
          stars: `${defaultStars}`,
        },
      ],
    });
    newMarker.coords = event.latLng;
    newMarker.iconImage = `${defaultIcon}`;
    /*  newMarker.content =
        "<p>Nouvelle adresse2 ? +</<p>" +
        JSON.stringify(event.latLng.toJSON(), null, 2); */
    newMarker.content = `${defaultStars}`;
    newMarker.ratings = [
      {
        comment: "mouif",
        stars: `${defaultStars}`,
      },
    ];
    console.log(`newMarkerStars`, newMarker.ratings[0].stars);
    markers.push(newMarker);
    //ici totalité des markers ajoutés au click
    allAddedMarkers = markers;
    console.log(`allmarkers`, allAddedMarkers);
    //copyArray(allAddedMarkers);
    //addMarker();
  });

  //loop through markers array to create a marker for every item in array
  for (let markerIndex = 0; markerIndex < markers.length; markerIndex++) {
    addMarker(markers[markerIndex]);
  }
  // create marker on map
  function addMarker(props) {
    // The marker, positioned at Paris
    const marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      ratings: props.ratings,
      content: props.ratings[0].stars,
      iconImage: props.iconImage,
      moyenneEntiere: props.moyenneEntiere,
    });

    marker.setVisible(true);

    //check for custom icon not undefined
    if (props.iconImage) {
      marker.setIcon(props.iconImage);
    }
    if (props.moyenneEntiere) {
      marker.moyenneEntiere = props.moyenneEntiere;
    }
    //check for infoWindow content not undefined
    if (props.content) {
      //add  infoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: props.content,
      });
      //show infoWindow on click
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    }

    let markersOnMap = allAddedMarkers;
    markersOnMap.push(marker);
    console.log(`markersOnMapArray`, markersOnMap);

    //search Restaurants by nearBy request & places.API
    let actualBounds = {
      north: 48.869939601515256,
      south: 48.83966955399011,
      west: 2.308019703857438,
      east: 2.395449900707991,
    }
    const request = {

      bounds: actualBounds,
      //location:paris
      //radius: '500',
      type: ["restaurant"],
      fields: ["name", "geometry", "opening_hours", "icon", "photo"],
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    //show markers on selected input
    //let mySelectors = document.getElementsByName("scoreMarkers");
    let mySelectors = document.getElementsByName("scoreValues");
    for (
      mySelectorsIndex = 0;
      mySelectorsIndex < mySelectors.length;
      mySelectorsIndex++
    ) {
      mySelectors[mySelectorsIndex].addEventListener("click", function (e) {
        let selectedValue = e.target.value;
        //let selectedValue = this.value;
        //console.log(`markers[i]`, markers[i].ratings[0].stars)
        //TODO newMarker pas complètement reconnu ! Nouveau marker non dans Selected
        for (let i = 0; i < markersOnMap.length; i++) {
          if (selectedValue == "All") {
            marker.setMap(map);
          } else {
            if (selectedValue == markersOnMap[i].moyenneEntiere) {
              console.log("true", markersOnMap[i].moyenneEntiere);
              /* TODO set setMap on selected marker  */
              console.log(marker, "markergoogle");
              markersOnMap[i].setMap(map);
            } else {
              console.log("false", markersOnMap[i].moyenneEntiere);
              marker.setMap(null);
            }
          }
          //console.log(`markers[i]`, markers[i].ratings[0].stars)
        }
      });
    }
  }

//Ajout localisation
infoWindow = new google.maps.InfoWindow();

const locationButton = document.createElement("button");

  locationButton.textContent = "Se déplacer sur votre lieu géolocalisé";
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
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
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

