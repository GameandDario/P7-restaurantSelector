const toggleComments = function () {
  let myButtons = document.getElementsByClassName("btn");
  let myCommentsID;
  /* myButtons est un HTMLCollection -> possibilité de manipuler comme un tableau */

  for (let k = 0; k < myButtons.length; k++) {
    myButtons[k].addEventListener("click", function () {
      myCommentsID = document.getElementById(
        "commentID_" + restaurants[k].restaurantName
      );
      console.log("myCid", myCommentsID);
      let myComment = document.getElementById(
        "comment_" + restaurants[k].restaurantName
      );
      if (myCommentsID.style.display === "none") {
        myCommentsID.style.display = "block";
        myComment.style.display = "block";
      } else {
        myCommentsID.style.display = "none";
        myComment.style.display = "none";
      }
    });
  }
};

toggleComments();
