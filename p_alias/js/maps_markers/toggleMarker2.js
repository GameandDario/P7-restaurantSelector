// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array : markers.
// The user can then click an option to hide, show or delete the markers.

let map;

let allAddedMarkers = [];

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
    }
    );

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
      moyenneEntiere:props.moyenneEntiere
    })
    
    marker.setVisible(true);

    //check for custom icon not undefined
    if (props.iconImage) {
      marker.setIcon(props.iconImage);
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
              console.log(marker, "markergoogle")
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
}
