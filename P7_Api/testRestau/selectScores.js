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
  
          for(let indexComment = 0; indexComment < comments.length; indexComment++){
            comments[indexComment].classList.add('hide');
          }
      });
    }
  
    // chargement de la page
    for (let k = 0; k < formInputs.length; k++) {
      if (formInputs[k].checked) {
        let valueSelected = formInputs[k].value;
        let restos = document.getElementsByClassName('restaurant-wrapper');
  
        handleRestoValue(restos, valueSelected);
      }
    }
  }
  
  function handleRestoValue(restos, valueSelected){
    // on affiche les restos en fonction de la valeur selected
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

  selectScores();