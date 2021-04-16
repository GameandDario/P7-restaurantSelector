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
        myArticle.setAttribute("class","averageScore_forArticle_All averageScore_forArticle_" + Math.floor(averageScore));
        

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
        document.body.addEventListener('change', function (e) {
            console.log('SCORE' + averageScore);

            //récupération des scores de chaque resto
            /* let myScores = document.getElementsByClassName("averageScore");
            let myScoreValue;
             for (let myScore of myScores) {
                myScoreValue = myScore.textContent.slice(8);
                
                /* myScoreValue string */
            //} 
            //recupération des valeurs à chaque input   
            let target = e.target;
            let displayArticles;
            //console.log(target.value);
            //console.log(myScoreValue);

           /*  if ((target.value = 5) && (averageScore = 5)) {
                
                displayArticles = document.getElementsByClassName("averageScore_forArticle_5");
                //console.log(display.innerHtml);
            } */
            

            switch (target.value) {
                case "All":
                    
                    displayArticles = document.getElementsByClassName("averageScore_forArticle_All");
                    
                    break;
                case "1":
                    displayArticles = document.getElementsByClassName("averageScore_forArticle_1");
                    break;
                case "2":
                    displayArticles = document.getElementsByClassName("averageScore_forArticle_2");
                    break;
                case "3":
                    displayArticles = document.getElementsByClassName("averageScore_forArticle_3");
                    break;
                case "4":
                    displayArticles = document.getElementsByClassName("averageScore_forArticle_4");
                    break;
                case "5":
                    displayArticles = document.getElementsByClassName("averageScore_forArticle_5");
                    break;
            }

            //result.innerHTML = displayArticles;
            console.log(displayArticles);
            /* for (let i =0;  i< displayArticles.length; i++) {
                displayArticle = displayArticles[i];
                console.log(displayArticle.innerHTML);
                result.innerHTML = displayArticle.innerHTML;
                 
            } */
            //displayArticles est une HTMLCollection
            for (let displayArticle of displayArticles) {
                console.log(displayArticle.innerHTML);
                result.innerHTML =displayArticle.innerHTML; 
            }
        })



        /* showComments = () => {

            let myButtons = document.getElementsByClassName("btn");
            /* myButtons est une HTMLCollection */
        /*
        let myBtn = "";
        let onlyID_Btn
        for (let i = 0; i < myButtons.length; i++) {
            myBtn = myButtons[i].id;
            //console.log(myBtn);
            onlyID_Btn = myBtn.split('btnID_')[1];
            console.log(onlyID_Btn);
        }

        let myComments = document.getElementsByClassName("comments_blocks");*/
        /* myComments est une HTMLCollection */
        /*let myCom = "";
        let onlyID_Com;
        for (let i = 0; i < myComments.length; i++) {
            myCom = myComments[i].id;
            //console.log(myCom);
            onlyID_Com = myCom.split('commentID_')[1];


        }
        console.log(onlyID_Com);
        if (onlyID_Com === onlyID_Btn) {
            alert('ok connc');
        } else {
            alert('no connect');
        }
    } */
    }
}
showRestaurants();


