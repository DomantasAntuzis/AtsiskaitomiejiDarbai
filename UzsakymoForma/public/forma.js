const pristatymasRadio1 = document.getElementById("pristatymasRadio1");
const pristatymasRadio2 = document.getElementById("pristatymasRadio2");
const pristatymasRadio3 = document.getElementById("pristatymasRadio3");

const pristatymas1 = document.getElementById("pristatymas1");
const pristatymas2 = document.getElementById("pristatymas2");
const pristatymas3 = document.getElementById("pristatymas3");

let inputsfor1 = document.getElementsByClassName("inputsfor1");
let inputsfor2 = document.getElementById("inputsfor2");
let inputsfor3 = document.getElementById("inputsfor3");

function updatePristatymas() {
  if (pristatymasRadio1.checked) {
    pristatymas1.style.display = "block";
    inputsfor1[0].setAttribute('required','');
  } else {
    pristatymas1.style.display = "none";
  }
  if (pristatymasRadio2.checked) {
    pristatymas2.style.display = "block";
    inputsfor2.setAttribute('required','');
  } else {
    pristatymas2.style.display = "none";
  }
  if (pristatymasRadio3.checked) {
    pristatymas3.style.display = "block";
    inputsfor3.setAttribute('required', '');
  } else {
    pristatymas3.style.display = "none";
  }
}

updatePristatymas();

pristatymasRadio1.addEventListener("change", updatePristatymas);
pristatymasRadio2.addEventListener("change", updatePristatymas);
pristatymasRadio3.addEventListener("change", updatePristatymas);

