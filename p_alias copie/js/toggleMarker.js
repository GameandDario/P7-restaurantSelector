//let myButtons = document.getElementsByClassName("show-comments");
let myMarkerID = "";


console.log(markers["0"])
for(let i =0; i < markers.length; i++) {
    console.log(markers[i])
}
/* markers[0].setMap(null)
for (let markerIndex = 0; markerIndex < markers.length; markerIndex++) {
  console.log(markers.length);
  myMarkerID = markers[markerIndex].id;
  console.log(myMarkerID);

  if (myMarkerID.classList.contains("hide")) {
    myMarkerID.classList.remove("hide");
  } else {
    myMarkerID.classList.add("hide");
  }
} */
function setMapOnAll(mapParis) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(mapParis);
    }
  }
  
// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(mapParis);
  }
  
  function hideMarkers() {
    setMapOnAll(null);
  }
  