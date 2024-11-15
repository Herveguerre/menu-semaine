// Fonction pour récupérer et insérer le contenu du footer
function inclureFooter() {
    fetch("../../footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer").innerHTML = data;
      });
  }
  inclureFooter();


  // Remplace l'image par le logo si elle n'est pas disponible
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img"); // Sélectionne toutes les images

  images.forEach((image) => {
    // Ajoute l'attribut lazy loading à chaque image
    image.setAttribute("loading", "lazy");

    // Remplace l'image par le logo si elle n'est pas disponible
    image.onerror = function () {
      this.src = "/G.png";
    };
  });
});