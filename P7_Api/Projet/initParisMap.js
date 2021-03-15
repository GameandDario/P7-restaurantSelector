// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let mapParis, infoWindow;


function initParisMap() {
  mapParis = new google.maps.Map(document.getElementById("mapParis"), {
    center: { lat: 48.856614, lng: 2.3522219 },
    zoom: 6,
  });
  // marker, positioned at Paris
  const marker = new google.maps.Marker({
    position: mapParis.center,
    map: mapParis,
  });
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

