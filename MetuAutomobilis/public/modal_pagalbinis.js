fetch("http://localhost:3000/aprasymai/aprasymas_3.html")
  .then(function (response) {
    // The API call was successful!
    return response.text();
  })
  .then(function (html) {
    // Convert the HTML string into a document object
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");

    // Get the text
    let textas = doc.getElementById("third").innerHTML;
    // console.log(textas)

    document.getElementById("id2").addEventListener("click", function () {
    document.getElementById("modal_text").innerHTML = textas;
    });
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });

// Get the modal
var modal = document.getElementById("mymodal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the button that opens the modal
var btn = document.getElementById("id2");

// When the user clicks on the button, open the modal
btn.onclick = function() {
modal.style.display = "block";
  }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
