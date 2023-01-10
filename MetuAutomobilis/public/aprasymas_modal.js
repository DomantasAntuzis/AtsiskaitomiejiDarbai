import auto from "http://localhost:3000/JSONfailai/automobiliai.JSON" assert { type: "json" };

for (let i = 0; i < auto.length; i++) {
  document.getElementById(`aprasymas${i + 1}`).addEventListener("click", function () {
    fetch(auto[i].aprasymas)
      .then(function (response) {
        // The API call was successful!
        return response.text();
      })
      .then(function (html) {
        // Convert the HTML string into a document object
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        // Get the text
        let textas = doc.getElementById("aprasymas").innerHTML;
        // console.log(textas)

        document.getElementById("modal_text").innerHTML = textas;
        modal.style.display = "block";
      })
      .catch(function (err) {
        // There was an error
        console.warn("Something went wrong.", err);
      });
  });
}

// Get the modal
var modal = document.getElementById("modal_div");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal ) {
    modal.style.display = "none";
  }
};

