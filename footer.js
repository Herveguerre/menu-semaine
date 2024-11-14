// Fonction pour récupérer et insérer le contenu du footer
function inclureFooter() {
    fetch("../../footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer").innerHTML = data;
      });
  }
  inclureFooter();