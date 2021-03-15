let listRestNames = "";
let listRestAdresses = "";
let listRestComments = "";
let listRestCoords = "";
let listRestScores = "";
let allRestoref = "";

const showAllRestaurants = () => {
    for (let i = 0; i < restaurants.length; i++) {
        let restNames;
        let restCoords;
        let restAdresses;
        let restRatings;

        restNames = '<p>' + restaurants[i].restaurantName + '</p>';
        restAdresses = '<p>' + restaurants[i].address + '</p>';
        restRatings = restaurants[i].ratings;
        console.log(restRatings);

        /* Boucle pour récupérer les notes */
        let restScore = [];
        let averageScore = "";

        for (let j = 0; j < restRatings.length; j++) {
            /* Intégrer au tableau restScore chaque score d'un restaurant, en s'assurant que le type soit un nombre (integer) */
            restScore.push(parseInt(restRatings[j].stars));

            const average = (restScore) => {
                let sum = 0;
                for (let i = 0; i < restScore.length; i++) {
                    sum += restScore[i];
                }
                averageScore = sum / restScore.length;
                console.log('mysaverageScore : ' + averageScore);
                return averageScore;
            }
            average(restScore);
        }

        /* Boucle pour récupérer les comments */
        let restComment = "";
        for (let k = 0; k < restRatings.length; k++) {
            restComment += '<p>' + restRatings[k].comment + '</p>';
        }

        listRestNames += restNames;
        listRestCoords += restCoords;
        listRestAdresses += restAdresses;
        listRestComments += restComment;
        listRestScores += '<p>' + averageScore + '</p>';

        /* Groupement des noms */
        const allNames = document.getElementById('restaurantsList');
        allNames.innerHTML = listRestNames;
        /* console.log(allNames.innerHTML); */

        /* Groupement des adresses */
        const allAdresses = document.getElementById('adressesList');
        allAdresses.innerHTML = listRestAdresses;
        /* console.log(allAdresses.innerHTML); */

        /* Groupement des commentaires */
        const allComments = document.getElementById('commentsList');
        allComments.innerHTML = listRestComments;

        /* Groupement des scores */
        const allScores = document.getElementById('scoreList');
        allScores.innerHTML = listRestScores;

    }
}
showAllRestaurants();

const showCoords = () => {
    for (let i = 0; i < restaurants.length; i++) {
        listRestCoords += document.getElementById('coordsList').textContent = restaurants[i].lat + ' ' + restaurants[i].long + ' ' + "<br/>";
        listRestCoords += restaurants[i].lat + ' ' + restaurants[i].long + ' ' + "<br/>";
        const latLng = new google.maps.LatLng(restaurants[i].lat, restaurants[i].long);
        new google.maps.Marker({
            position: latLng,
            map: mapParis,
        });
        
        listRestNames += restaurantsList.restaurantName + "<br>";
        listRestCoords += restaurantsList.lat + ' ' + restaurantsList.long + "</br>";    
    }
    return listRestCoords;
}




