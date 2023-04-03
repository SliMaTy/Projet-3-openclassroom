
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const valid = document.getElementById("login-form-submit");
const form = document.getElementById("login-form");

// Écouteur d'événement pour le formulaire de connexion
form.addEventListener("submit", function (e) {
  // Empêche l'envoi par défaut du formulaire par le navigateur, l'envoi est géré par notre code JavaScript
  e.preventDefault();

  // Récupère les entrées de formulaire
  const information = new FormData(form);
  const payload = new URLSearchParams(information);

  // Fait une demande POST au serveur pour vérifier les informations de connexion
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.userId == 1) {
        localStorage.setItem("token", data.token);
        location.href = "../../index.html";
      } else {
        error.innerText = " Erreur dans l’identifiant ou le mot de passe";
        }
      }
    )
    .catch((err) => console.log(err)); 
});
