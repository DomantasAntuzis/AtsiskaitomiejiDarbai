
import auto from "http://localhost:3000/JSONfailai/automobiliai.JSON" assert { type: "json" };

function korteles() {
  let card = "";
  for (let i = 0; i < auto.length ; i++) {
    card += `<div class="card" style="width: 18rem;">
<img src="${auto[i].img}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title" style="text-align:center">${auto[i].pavadinimas}</h5>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item"><button id="id${i}">Aprašymas</button>
</button></li>
  <li class="list-group-item"><button id="charakteristikos">Chatakteristikos</button>
</button></li>
</ul>
<div class="card-body">
<button type="button" class="btn btn-primary">Balsuoti</button>
</div>
</div>`;
  }

  document.getElementById("content").innerHTML = card;
  return card;
}



korteles();

