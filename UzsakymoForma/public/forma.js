const pristatymasRadio1 = document.getElementById("pristatymasRadio1");
const pristatymasRadio2 = document.getElementById("pristatymasRadio2");
const pristatymasRadio3 = document.getElementById("pristatymasRadio3");

const pristatymas1 = document.getElementById("pristatymas1");
const pristatymas2 = document.getElementById("pristatymas2");
const pristatymas3 = document.getElementById("pristatymas3");

function updatePristatymas() {
  if (pristatymasRadio1.checked) {
    pristatymas1.style.display = "block";
    pristatymas1.setAttribute('required','')
  } else {
    pristatymas1.style.display = "none";
    pristatymas1.removeAttribute('required');
  }
  if (pristatymasRadio2.checked) {
    pristatymas2.style.display = "block";
    pristatymas2.setAttribute('required','');
  } else {
    pristatymas2.style.display = "none";
    pristatymas2.removeAttribute('required');
  }
  if (pristatymasRadio3.checked) {
    pristatymas3.style.display = "block";
    pristatymas3.setAttribute('required', '');
  } else {
    pristatymas3.style.display = "none";
    pristatymas3.removeAttribute('required');
  }
}

updatePristatymas();

pristatymasRadio1.addEventListener("change", updatePristatymas);
pristatymasRadio2.addEventListener("change", updatePristatymas);
pristatymasRadio3.addEventListener("change", updatePristatymas);