import auto from "http://localhost:3000/JSONfailai/automobiliai.JSON" assert { type: "json" };
import votesi from "http://localhost:3000/data.JSON" assert { type: "json" };

for (let i = 0; i < auto.length; i++) {
  document
    .getElementById(`balsuoti${i + 1}`)
    .addEventListener("click", function () {
      fetch("http://localhost:3000/svetaine.html")
        .then(function (response) {
          return response.text();
        })
        .then(function () {
          const totalVotes = Object.values(votesi).reduce(
            (total, n) => (total += n),
            0
          );

          let data = votesi;

          data = Object.entries(data).map(([id, votes]) => {
            return {
              pavadinimas: auto[id - 1].pavadinimas,
              votes,
              percentage: ((100 * votes) / totalVotes || 0).toFixed(0),
            };
          });

          let keys;
          let values;

          let testing = "";

          for (let e = 0; e < data.length; e++) {
            document.getElementById(`balsuoti${e + 1}`).style.display = "none";
            keys = Object.keys(data[e]);
            values = Object.values(data[e]);
            for (let g = 0; g < keys.length; g++) {
              if (g == 2) {
                testing +=`${keys[g]}:` + ` ` + ` ${values[g]}` +  `%<br>`;
              } else {
                testing += `${keys[g]}:` + ` ` + ` ${values[g]};` + ` `;
              }
            }
          }

          document.getElementById("results").innerHTML = testing;
        })
        .catch(function (err) {
          console.warn("Something went wrong.", err);
        });
    });
}
