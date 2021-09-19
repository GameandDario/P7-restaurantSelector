const section = document.querySelector("section");

function showRestaurants() {
  /* Afficher les restaurants en fonction d'une liste JSON */

  for (let i = 0; i < restaurants.length; i++) {
    let UrlApi =
      "https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" +
      restaurants[i].lat +
      "," +
      restaurants[i].long +
      "&fov=80&heading=70&pitch=0&key=AIzaSyDMAm0Z6pnqlSPV8LcE1JfPZpAy9hOlBic";

    const myArticle = document.createElement("article");
    /* ajout div autour btn */
    const myContainer = document.createElement("div");
    const nameBtn = document.createElement("button");
    const restaurantImg = document.createElement("img");
    restaurantImg.src = UrlApi;
    const paragraphAdress = document.createElement("p");
    const hr = document.createElement("hr");
    const paragraphComments = document.createElement("p");
    const listComments = document.createElement("ul");
    const paragraphStars = document.createElement("p");

    nameBtn.textContent = restaurants[i].restaurantName;
    paragraphAdress.textContent = "Adresse : " + restaurants[i].address;
    paragraphComments.textContent = "Commentaires : ";
    paragraphStars.textContent = "Score : ";

    const Ratings = restaurants[i].ratings;
    /* Boucle pour récupérer les commentaires */
    for (let j = 0; j < Ratings.length; j++) {
      const listItem = document.createElement("li");
      listItem.textContent = Ratings[j].comment;
      listComments.appendChild(listItem);
    }
    /* Boucle pour récupérer les moyennes */
    let restScore = [];
    let averageScore = "";
    const starItem = document.createElement("span");
    for (let k = 0; k < Ratings.length; k++) {
      /* Intégrer au tableau restScore chaque score d'un restaurant, en s'assurant que le type soit un nombre (integer) */
      restScore.push(parseInt(Ratings[k].stars));

      const average = (restScore) => {
        let sum = 0;
        for (let i = 0; i < restScore.length; i++) {
          sum += restScore[i];
        }
        /* averageScore = sum / restScore.length;
                console.log('mysaverageScore : ' + averageScore);
                return averageScore; */
        averageScore = sum / restScore.length;
      };
      average(restScore);
      starItem.textContent = averageScore;
    }

    /* Construction de élements de la section */
    paragraphStars.appendChild(starItem);
    myArticle.appendChild(myContainer);
    myContainer.appendChild(nameBtn);
    nameBtn.appendChild(restaurantImg);
    myContainer.appendChild(paragraphAdress);
    myContainer.appendChild(hr);
    myContainer.appendChild(paragraphComments);
    paragraphComments.appendChild(listComments);
    myContainer.appendChild(paragraphStars);

    /* Definition styles & attributs */
    myContainer.setAttribute("class", "my_container");
    restaurantImg.setAttribute("class", "ml-5 rounded");
    nameBtn.setAttribute("class", "btn");
    paragraphStars.setAttribute("class", "averageScore");

    paragraphComments.setAttribute("class", "comments_blocks");
    paragraphComments.style.display = "none";
    listComments.setAttribute("class", "comments_blocks");
    listComments.style.display = "none";

    /* set id to buttons and comments */
    nameBtn.setAttribute("id", "btnID_" + restaurants[i].restaurantName);
    paragraphComments.setAttribute(
      "id",
      "commentID_" + restaurants[i].restaurantName
    );
    listComments.setAttribute("id", "comment_" + restaurants[i].restaurantName);

    myArticle.setAttribute(
      "class",
      "averageScore_forArticle_All averageScore_forArticle_" +
        Math.floor(averageScore)
    );

    /* Restitutions des élements de l'article dans la section */
    section.appendChild(myArticle);

    /* Affichage dans la section #result */
    let result = document.querySelector("#result");
    /* récupération de tous les articles */
    let allArticles = document.getElementsByTagName("article");
    let eachArticleHtml = "";
    for (let i = 0; i < allArticles.length; i++) {
      eachArticleHtml += allArticles[i].innerHTML;
    }
    /* récupérer articles par Score différent de All*/
    let articlesByAverageScores = document.getElementsByClassName(
      "averageScore_forArticle_" + Math.floor(averageScore)
    );
    /* articlesByAverageScores est un HTMLCollection et peut être traité comme un tableau*/
    let myArticlesScore = "";
    let myArticlesHtml = "";
    let onlyScore;
    let allArticlesScore;
    let onlyAll;
    
    for (let i = 0; i < articlesByAverageScores.length; i++) {
      myArticlesScore = articlesByAverageScores[i].className;


      /* myArticleScore est un objet */
      myArticlesHtml += articlesByAverageScores[i].innerHTML;

      /* récupération des scores de restaurants */
      onlyScore = myArticlesScore.split(
        "averageScore_forArticle_All averageScore_forArticle_"
      );
      allArticlesScore = myArticlesScore.split(
        " averageScore_forArticle_" + Math.floor(averageScore)
      );
      onlyAll = allArticlesScore[0].split("averageScore_forArticle_");
    }
    let buttonsOnChange = document.getElementsByClassName("btn");
    document.body.addEventListener("change", function (e) {
      
     
      //recupération des valeurs à chaque input      
      let target = e.target;
      
       //appel de fonction pour afficher / cacher les commentaires
      
      //console.log(target.value + onlyScore[1] + onlyAll[1]);
      if (target.value === onlyScore[1]) {
        
        result.innerHTML = myArticlesHtml;
        toggleComments();
        
        
      } else if (target.value === onlyAll[1]) {
        result.innerHTML = eachArticleHtml;
        toggleComments();
        
      } 
      
      let myArray=[];
      let btnOnChange="";
      
        for (let k =0; k < buttonsOnChange.length; k++) {
            //console.log(buttonsOnChange[k]);
            console.log("taat " + [k]);
            
            myArray.push(buttonsOnChange[k]);
            
            console.log(myArray);
            for (let r= 0; r < myArray.length; r++) {
              
                btnOnChange = myArray[r];
                
                console.log(btnOnChange);
                btnOnChange.addEventListener("clic", function() {               
                })

            } 
            
        }
        
    });
   
  }
}
showRestaurants();
