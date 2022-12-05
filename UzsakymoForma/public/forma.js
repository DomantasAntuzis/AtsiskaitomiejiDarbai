const pristatymasRadio1 = document.getElementById("pristatymasRadio1");
const pristatymasRadio2 = document.getElementById("pristatymasRadio2");
const pristatymasRadio3 = document.getElementById("pristatymasRadio3");

const pristatymas1 = document.getElementById("pristatymas1");
const pristatymas2 = document.getElementById("pristatymas2");
const pristatymas3 = document.getElementById("pristatymas3");

function updatePristatymas() {
  if (pristatymasRadio1.checked) {
    pristatymas1.style.display = "inline";
  } else {
    pristatymas1.style.display = "none";
  }
  if (pristatymasRadio2.checked) {
    pristatymas2.style.display = "inline";
  } else {
    pristatymas2.style.display = "none";
  }
  if (pristatymasRadio3.checked) {
    pristatymas3.style.display = "inline";
  } else {
    pristatymas3.style.display = "none";
  }
}

updatePristatymas();

pristatymasRadio1.addEventListener("change", updatePristatymas);
pristatymasRadio2.addEventListener("change", updatePristatymas);
pristatymasRadio3.addEventListener("change", updatePristatymas);