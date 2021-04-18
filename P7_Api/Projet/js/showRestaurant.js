const section = document.querySelector('section');


function showRestaurants() {

    for (let i = 0; i < restaurants.length; i++) {
        let UrlApi = "https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" + restaurants[i].lat + "," + restaurants[i].long + "&fov=80&heading=70&pitch=0&key=AIzaSyCeSiulkcYInDl8YyLIShUuvyXXDaZqhGc";

        const myArticle = document.createElement('article');
        const nameBtn = document.createElement('button');
        const restaurantImg = document.createElement('img');
        restaurantImg.src = UrlApi;
        const paragraphAdress = document.createElement('p');
        const hr = document.createElement('hr');
        const paragraphComments = document.createElement('p');
        const listComments = document.createElement('ul');
        const paragraphStars = document.createElement('p');

        nameBtn.textContent = restaurants[i].restaurantName;
        paragraphAdress.textContent = 'Adresse : ' + restaurants[i].address;
        paragraphComments.textContent = 'Commentaires : ';
        paragraphStars.textContent = 'Score : ';

        const Ratings = restaurants[i].ratings;
        /* Boucle pour récupérer les commentaires */
        for (let j = 0; j < Ratings.length; j++) {
            const listItem = document.createElement('li');
            listItem.textContent = Ratings[j].comment;
            listComments.appendChild(listItem);
        }
        /* Boucle pour récupérer les moyennes */
        let restScore = [];
        let averageScore = "";
        const starItem = document.createElement('span');
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
            }
            average(restScore);
            starItem.textContent = averageScore;

        }

        /* Construction de élements de la section */
        paragraphStars.appendChild(starItem);
        myArticle.appendChild(nameBtn);
        nameBtn.appendChild(restaurantImg);
        myArticle.appendChild(paragraphAdress);
        myArticle.appendChild(hr);
        myArticle.appendChild(paragraphComments);
        paragraphComments.appendChild(listComments);
        myArticle.appendChild(paragraphStars);

        /* Definition styles & attributs */
        restaurantImg.setAttribute("class", "ml-5 rounded");
        nameBtn.setAttribute("class", "btn");
        paragraphStars.setAttribute("class", "averageScore");

        paragraphComments.setAttribute("class", "comments_blocks");
        paragraphComments.style.display = "none";

        /* set id to buttons and comments */
        nameBtn.setAttribute("id", "btnID_" + restaurants[i].restaurantName);
        paragraphComments.setAttribute("id", "commentID_" + restaurants[i].restaurantName);
        myArticle.setAttribute("class", "averageScore_forArticle_All averageScore_forArticle_" + Math.floor(averageScore));


        section.appendChild(myArticle);

        let myButtons = document.getElementsByClassName("btn");
        /* récupérer comments par iD*/
        let myComments = document.getElementById("commentID_" + restaurants[i].restaurantName);
        /* Afficher les commentaires en fonction  de leur display */
        for (let z = 0; z < myButtons.length; z++) {
            myButtons[z].addEventListener("click", function () {
                if (myComments.style.display === "none") {
                    myComments.style.display = "block"
                }
                else {
                    myComments.style.display = "none"
                }
            });
        }

        let result = document.querySelector('#result');

        /* récupération de tous les articles */
        let allArticles = document.getElementsByTagName('article');
        let eachArticleHtml = "";
        for (let i = 0; i < allArticles.length; i++) {
            eachArticleHtml += allArticles[i].innerHTML;
        }
        /* récupérer articles par Score différent de All*/
        let articlesByAverageScores = document.getElementsByClassName('averageScore_forArticle_' + Math.floor(averageScore));

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
            onlyScore = myArticlesScore.split('averageScore_forArticle_All averageScore_forArticle_');
            allArticlesScore = myArticlesScore.split(' averageScore_forArticle_' + Math.floor(averageScore));
            onlyAll = allArticlesScore[0].split('averageScore_forArticle_')
        };

        document.body.addEventListener('change', function (e) {
            //recupération des valeurs à chaque input   
            let target = e.target;
            console.log(target.value + onlyScore[1] + onlyAll[1]);
            if (target.value === onlyScore[1]) {
                result.innerHTML = myArticlesHtml;
            }
            else if (target.value === onlyAll[1]) {
                result.innerHTML = eachArticleHtml;
            }
            else if (target.value != onlyAll[1]) {
                result.innerHTML = "nope";
            }
        })
    }
}
showRestaurants();


