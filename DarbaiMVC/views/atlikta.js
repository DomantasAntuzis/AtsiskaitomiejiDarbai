// console.log("veikia")

function veluojantysDarbai() {
    let allcards = document.getElementsByClassName("card");
    let regex = /VĖLUOJI/;

    for (let i = 0; i < allcards.length; i++) {
      let dom = new DOMParser().parseFromString(
        allcards[i].innerHTML,
        "text/html"
      );

      let div = allcards[i];
      let body = dom.getElementsByTagName("p");
      let result = body[1].textContent;

      if (regex.test(result) == true) {
        div.style.background = "rgb(255,126,126)";
        div.style.background =
          "linear-gradient(90deg, rgba(255,126,126,1) 23%, rgba(133,50,50,1) 58%)";
      }
    }
  }

  veluojantysDarbai()

function atnaujintiMygtukus() {
    let buttons = document.getElementsByClassName("senddata");
    for (let btn of buttons) {
      btn.onchange = async function () {
       await axios({
          method: "get",
          url: "http://localhost:3000/atlikta/" + this.dataset.id,
        })
          .then(function (response) {
            console.log(response);
            uzkrautiDarbus();
        })
        .catch(function (error) {
            console.log(error);
        });
        window.location.reload();
      };
    }
  }

  atnaujintiMygtukus();

//   veluojantysDarbai();
//   function uzkrautiDarbus() {
//     axios({
//       method: "get",
//       url: "http://localhost:3000/darbai",
//     })
//       .then(function (response) {
//         console.log(response);
//         document.getElementById("darbai").innerHTML = response.data;
//         veluojantysDarbai();
//         atnaujintiMygtukus();
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   // uzkrautiDarbus();
//   setTimeout(uzkrautiDarbus, 1000);