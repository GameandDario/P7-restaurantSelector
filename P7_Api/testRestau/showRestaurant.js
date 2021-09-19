const section = document.querySelector("section");

function showRestaurants() {
  /* Afficher les restaurants en fonction d'une liste JSON */
// Construire la structure html
  
  result.innerHTML = '';
  // récupérer les données des restos dans le json restaurants 
  for (let indexRestaurant in restaurants){
    let result = document.querySelector("#result");
    let ratings = restaurants[indexRestaurant].ratings;

    let commentsHtml = `<ul>`;
    let sommeNotesResto = 0;
    let nbRatings = ratings.length;
    let moyenneNoteRestaurant;

    for(let indexRating in ratings){
        commentsHtml += `<li>${ratings[indexRating].stars} étoiles <br/> ${ratings[indexRating].comment}</li>`;
        sommeNotesResto += ratings[indexRating].stars;
    }

    moyenneNoteRestaurant = sommeNotesResto / nbRatings;
    let moyenneEntiereRestaurant = Math.floor(moyenneNoteRestaurant);
    let moyenneArrondi = Math.floor(moyenneNoteRestaurant*100)/100;

    commentsHtml += `</ul>`;

    let restoHtml = `<div class="restaurant-wrapper restaurant-${moyenneEntiereRestaurant}">
        <button class="label btn show-comments">
          ${restaurants[indexRestaurant].restaurantName}
          <a class="ml-3" href="#">Afficher les avis</a>
        </button>
        <span class="address">${restaurants[indexRestaurant].address}</span>
        <div class="comments-wrapper">
          <div class="moyenne">${moyenneArrondi}</div>
          <div class="comments hide" id="comments-${indexRestaurant}">${commentsHtml}</div>
        </div>
    </div>`;

    result.innerHTML += restoHtml;
  }
}

/* Récuperer les valeurs des inputs et  */
function selectScores(){
  let formInputs = document.getElementsByClassName('form-check-input');

  for (let k = 0; k < formInputs.length; k++) {
    formInputs[k].addEventListener("click", function (e) {
        //recupération des valeurs à chaque input
        let valueSelected = this.value;
        let target = e.target;
        let restos = document.getElementsByClassName('restaurant-wrapper');

        handleRestoValue(restos, valueSelected);

        let comments = document.getElementsByClassName('comments');
        // Cacher les commentaires à chaque click d'input
        for(let indexComment = 0; indexComment < comments.length; indexComment++){
          comments[indexComment].classList.add('hide');
        }
    });
  }

  // chargement de la page
  /* for (let k = 0; k < formInputs.length; k++) {
    if (formInputs[k].checked) {
      let valueSelected = formInputs[k].value;
      let restos = document.getElementsByClassName('restaurant-wrapper');

      handleRestoValue(restos, valueSelected);
    }
  } */
}

function handleRestoValue(restos, valueSelected){
  // on affiche les restos en fonction de la valeur selected
  console.log(valueSelected);
  if(valueSelected == 'All'){
      for(let indexResto = 0; indexResto < restos.length; indexResto++){
        if (restos[indexResto].classList.contains('hide')) {
            restos[indexResto].classList.remove('hide');
        }
      }
  }else{
    for(let indexResto = 0; indexResto < restos.length; indexResto++){
      if (restos[indexResto].classList.contains('restaurant-'+valueSelected)) {
        restos[indexResto].classList.remove('hide');
      }else{
        restos[indexResto].classList.add('hide');
      }
    }
  }
}

showRestaurants();
selectScores();
