const btn_tous = document.getElementById("btn_tous");
const gallery = document.querySelector(".gallery");
let token = localStorage.getItem("token");

// Fonction pour supprimer un projet
function deleteProject(id) {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(data => {
    })
    .catch((err) => console.log("Il y a un problème : " + err));
}

// Vérification de la présence d'un ID dans le local storage
if (localStorage.getItem("id")) {
  let getId = JSON.parse(localStorage.getItem("id"));
  for (let id of getId) {
    deleteProject(id);
    tout();
    console.log("L'ID est : ", id);
  }
  localStorage.removeItem("id");
}

// Fonction pour afficher les informations d'un projet
function info(work) {
  const card = `
    <figure id ="A${work?.id}" >
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
      <figcaption>${work?.title}</figcaption>
    </figure>
          `;
  document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}
// Fonction pour afficher tous les projets
function tout() {
  fetch("http://localhost:5678/api/works").then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        console.log(data); 
        document.querySelector(".gallery").innerHTML = ""; 
        for (let i = 0; i <= data.length - 1; i++) {
          info(data[i]); 
        }
      });
    }
  });
}

btn_tous.addEventListener("click", tout); 

// Fonction pour supprimer les données entrées lors de l'ajout d'un projet
function supprime() {
  // Suppression de l'affichage des données quand on ferme la boîte de dialogue d'ajout
  document.getElementById("model_ajout_container").style.display = null;
  document.getElementById("image_telecharger_images").style.display = "none";

  // Suppression des données de titre
  const input_titre_ajout = document.getElementById("input_model");
  input_titre_ajout.value = null;

  // Suppression de l'URL de la photo
  const input_photo_url = document.getElementById("img_input");
  input_photo_url.value = null;

  // Suppression des données de catégorie
  const category = document.getElementById("categorie");
  category.value = null;
}

// Function to display all photos in the modal
function photos(works) {
  const photo_modal = `
      <figure id ="B${works.id}" class="imageSize">
   
                <div id="repertoire_modal" class="photo_model_efface">
      <img src="${works?.imageUrl} "crossOrigin="anonymous">
              <i id ="${works.id}" class="fa-regular fa-trash-can "></i>
             </div>
                  <figcaption>éditer</figcaption>
      </figure>
            `;


  document
    .getElementById("model_gallery")
    .insertAdjacentHTML("beforeend", photo_modal);
}

// Fonction pour afficher les photos dans la modale
function afficheModel() {
  fetch("http://localhost:5678/api/works").then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        document.getElementById("model_gallery").innerHTML = "";
        for (let i = 0; i <= data.length - 1; i++) {
          photos(data[i]);
        }
      });
    }
  });
}

///// CREER DES BOUTON OBJECT ////

// Récupération de la liste des œuvres
fetch("http://localhost:5678/api/works").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      const numSlid = data.length;
      
      // Récupération de la liste des catégories
      fetch("http://localhost:5678/api/categories").then((res) => {
        if (res.ok) {
          res.json().then((category) => {
            // Création d'un bouton pour chaque catégorie
            for (let count = 0; count <= category.length - 1; count++) {
              const object = document.createElement("button");
              object.type = "button";
              object.innerHTML = category[count].name;
              object.className = "btn_option";
              object.onclick = function () {
                // Effacer la galerie
                document.querySelector(".gallery").innerHTML = "";
                // Afficher les œuvres de la catégorie sélectionnée (filtre)
                for (let i = 0; i <= numSlid; i++) {
                  if (data[i]?.category.name === category[count].name) {
                    info(data[i]);
                  }
                }
              };
              //// Enlever les boutons dans le mode connexion
              if (localStorage.getItem("token")) {
                console.log("Bienvenue Sophie");
              } else {
                const button = document.getElementById("btn");
                button.appendChild(object);
              }
            }
          });
        }
      });
    });
  }
  tout();
});

/////entrer a la page model
if (localStorage.getItem("token")) {
  let tableauId = [];
  //replacer le login par logout
  document.getElementById("login").innerText = "logout";
  //remove btn tous
  document.getElementById("btn").remove(btn_tous);

  /////crée div de modification

  document.getElementById("modifer").style.backgroundColor = "black";

  //edition
  const edition = document.createElement("div");
  edition.type = "button";

  // La fonction modifier
  const modification = `

<div id="modeEdition">
<i class="fa-regular fa-pen-to-square"></i>
<p>Mode édition</p>  </div>`;
  edition.insertAdjacentHTML("afterbegin", modification);
  edition.className = "edition";
 
  edition.onclick = function () {}
  // Création d'un bouton "modifier"
  const modifier = `

<div id= "modifier">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;

  // Création d'un modèle de boîte de dialogue pour la modification
  const modifier_model = `
<a href ="#modal"></a>

<div id= "modifier_model">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;
  // Ajout du bouton "modifier" dans la page
  document
    .getElementById("portfolio_titre")
    .insertAdjacentHTML("afterend", modifier_model);
  document
    .getElementById("introduction_article")
    .insertAdjacentHTML("afterbegin", modifier);
  document
    .getElementById("introduction_photo")
    .insertAdjacentHTML("beforeend", modifier);

  // Affichage de la boîte de dialogue pour la modification
  afficheModel();

  ////////////  SUPPRIMER  //////////////:

  // Cette fonction effectue une requête fetch pour récupérer les données des projets
  function suppression() {
    fetch("http://localhost:5678/api/works").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          // Pour chaque projet, on crée une fonction pour supprimer le projet de la page
          for (let counter = 0; counter <= data.length; counter++) {
            function delet() {
              data[counter].id;

              console.log(`${data[counter]?.id}`);
              console.log(data[counter].id);

              // On supprime les éléments de la page correspondant au projet
              var element = document.getElementById(`B${data[counter].id}`);
              element?.remove();
              var element2 = document.getElementById(`A${data[counter].id}`);
              element2?.remove();

              // On ajoute l'ID du projet à un tableau pour le supprimer ultérieurement
              tableauId.push(data[counter].id);
              console.log(tableauId);
              localStorage.setItem("id", JSON.stringify(tableauId));
            }

            // On ajoute un écouteur d'événements pour chaque projet
            var id = document.getElementById(`${data[counter]?.id}`);
            if (id) {
              id.addEventListener("click", delet);
            }
            console.log(localStorage.getItem("id"));
          }

          // Cette fonction effectue une requête fetch pour supprimer un projet
          function deleteProject(id) {
            fetch("http://localhost:5678/api/works/" + id, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())

              .catch((err) => console.log("il y a un problème" + err));
          }

          // Si des projets ont été supprimés, on supprime les projets correspondants dans la base de données
          if (localStorage.getItem("id")) {
            let getId = JSON.parse(localStorage.getItem("id"));
            for (let id of getId) {
              deleteProject(id);
              tout();
              console.log("le ID ", id);
            }

            // On supprime le tableau d'IDs stocké dans le localStorage
            localStorage.removeItem("id");
            console.log("supprimer");
          }
        });
      }
    });
  }

  // On appelle la fonction suppression()
  suppression();

  let page = null;

  ///////////////////////ouvre modal////////////////////

  // Fonction pour ouvrir le modal
  function ouvre_modal(e) {
    e.preventDefault;

    // Sélectionne l'élément avec l'id "modal" et le montre
    const target = document.getElementById("modal");
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    page = target;

    // Ajoute un événement "click" à la page pour pouvoir la fermer
    page?.addEventListener("click", ferme_modal);

    // Ajoute un événement "click" pour empêcher la propagation de l'événement
    page
      .querySelector(".js_modal_stop")
      .addEventListener("click", stopPropagation);

    // Appelle la fonction suppression() pour supprimer des éléments du DOM
    suppression();
  }

  // Ajoute un événement "click" pour ouvrir le modal au bouton "modifier_model"
  document
    .getElementById("modifier_model")
    .addEventListener("click", ouvre_modal);


  // Ajoute un événement "click" pour ouvrir le modal quand on clique sur la flèche de retour
  document.getElementById("left").addEventListener("click", ouvre_modal);

  // Ouvre le modal avec la touche "Enter" du clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      ouvre_modal(e);
    }

    // Empêche la propagation de l'événement
    const stopPropagation = function (e) {
      e.stopPropagation();
    };
  });

  // Fonction pour fermer le modal
  function ferme_modal(e) {
    e.preventDefault;

    // Sélectionne l'élément avec l'id "modal" et le cache
    const page = document.getElementById("modal");
    page.style.display = "none";
    page.setAttribute("aria-hidden", "true");
    page?.removeEventListener("click", ferme_modal);
  }

  // Ajoute un événement "click" pour fermer le modal au bouton "model_fermer"
  document
    .getElementById("model_fermer")
    .addEventListener("click", ferme_modal);

  // Ajoute un événement "click" pour fermer le modal au bouton "model_ajoute"
  document
    .getElementById("model_ajoute")
    .addEventListener("click", ferme_modal);

  // Ferme le modal avec la touche "Escape" ou "Esc" du clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      ferme_modal(e);
    }
  });

  // Désactive la possibilité de modifier à nouveau en cliquant sur le bouton "modifier"
  edition.onclick = function () {
    document
      .getElementById("portfolio_titre")
      .removeAttribute("modifier_model");
    document.getElementById("introduction_article").removeAttribute("modifier");
    document.getElementById("introduction_photo").removeAttribute("modifier");
  };

  // Sélectionne l'élément avec l'id "modifier" et y ajoute l'élément "edition"
  const edit = document.getElementById("modifier");
  edit.appendChild(edition);

  let model_ajout = null;

  // Fonction pour ouvrir le modal d'ajout de photo
  function ouvre_modal_ajoute(e) {
    e.preventDefault;
    const model_page = document.getElementById("modal_ajout");
    model_page.style.display = null;
    model_page.removeAttribute("aria-hidden");
    model_ajout = model_page;
    model_ajout?.addEventListener("click", ferme_modal_ajoute);
    model_ajout
      .querySelector(".js_modal_stop")
      .addEventListener("click", stopPropagation);

    // Réinitialise la catégorie à null
    const category = document.getElementById("categorie");
    category.value = null;

    // Ferme le modal quand on clique en dehors
  }

  // Ajoute un écouteur d'événements pour ouvrir le modal d'ajout de photo
  document
    .getElementById("model_ajoute")
    .addEventListener("click", ouvre_modal_ajoute);

  // Ajoute un écouteur d'événements pour ouvrir le modal avec le clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      ouvre_modal_ajoute(e);
    }
  });

  // Fonction pour arrêter la propagation de l'événement
  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  // Fonction pour fermer le modal d'ajout de photo
  function ferme_modal_ajoute(e) {
    e.preventDefault;
    const model_ajout = document.getElementById("modal_ajout");
    model_ajout.style.display = "none";
    model_ajout.setAttribute("aria-hidden", "true");
    model_ajout?.removeEventListener("click", ferme_modal_ajoute);

    // Supprime les données quand on ferme
    supprime();

    // Supprime le message d'erreur
    document.getElementById("msg_err").innerHTML = "";
  }

  // Ajoute un écouteur d'événements pour fermer le modal d'ajout de photo
  document
    .getElementById("model_fermer_ajouter")
    .addEventListener("click", ferme_modal_ajoute);

  // Ajoute un écouteur d'événements pour fermer le modal avec la flèche de retour
  document.getElementById("left").addEventListener("click", ferme_modal_ajoute);

  // Ajoute un écouteur d'événements pour fermer le modal avec le clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      ferme_modal_ajoute(e);
    }
  });

  // Fonction pour télécharger les photos
  function telecharger() {
    const input = document.getElementById("img_input");
    var telecharger_image = "";
    const reader = new FileReader();

    // Ajoute un écouteur d'événements pour charger l'image
    reader.addEventListener("load", () => {
      telecharger_image = reader.result;
      const photo = document.getElementById("image_telecharger");
      document.getElementById("image_telecharger_images").style.display = null;

      photo.style.backgroundImage = `url(${telecharger_image} )`;
      document.getElementById("model_ajout_container").style.display = "none";
    });

    reader.readAsDataURL(this.files[0]);
  }

  // Ajoute un écouteur d'événements pour télécharger les photos
  document.getElementById("img_input").addEventListener("change", telecharger);

  ///////////////////Envoi des fichiers a API///////////////////

  document.getElementById("modal_ajout").addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupération des éléments du formulaire
    const photo = document.getElementById("img_input");
    const category = document.getElementById("categorie");
    const title = document.getElementById("input_model");

    // Vérification que le formulaire est rempli
    if (photo.value === "" || title.value === "" || category.value === "") {
      document.getElementById("msg_err").innerHTML =
        "Il faut remplir le formulaire.";
    } else {
      document.getElementById("msg_err").innerHTML = "";

      // Récupération des catégories depuis l'API
      fetch("http://localhost:5678/api/categories").then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((categorydata) => {
            // Parcours de la liste des catégories pour récupérer l'id correspondant à la catégorie sélectionnée
            for (let i = 0; i <= categorydata.length - 1; i++) {
              if (category.value === categorydata[i].name) {
                categorydata[i].name = categorydata[i].id;
                console.log(categorydata[i].id);
                console.log(category.value);

                // Récupération de l'image et du token de l'utilisateur
                const image = document.getElementById("img_input").files[0];
                let token = localStorage.getItem("token");
                console.log(`Bearer  ${token}`);
                const titre = document.getElementById("input_model").value;

                // Vérification de la taille de l'image
                if (image.size < 4 * 1048576) {
                  // Création du formulaire pour l'envoi des données
                  const formData = new FormData();
                  formData.append("image", image);
                  formData.append("title", titre);
                  formData.append("category", categorydata[i].id);

                  // Envoi des données à l'API via une requête POST
                  const setNewProject = async (data) => {
                    try {
                      const requete = await fetch(
                        "http://localhost:5678/api/works",
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            accept: "application/json",
                          },
                          body: data,
                        }
                      );
                      if (requete.status === 201) {
                        document.querySelector(".gallery").innerHTML = "";
                        document.getElementById("model_gallery").innerHTML = "";
                        tout();
                        afficheModel();
                      } else {
                        throw "Un problème est survenu.";
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  };
                  setNewProject(formData);
                } else {
                  // Affichage d'un message d'erreur si la taille de l'image est trop grande
                  document.getElementById("msg_err").innerHTML =
                    "La taille de la photo est supérieure à 4 Mo.";
                  // Réinitialisation du champ d'upload de fichier
                  photo.value = null;
                  document.getElementById(
                    "model_ajout_container"
                  ).style.display = null;
                  document.getElementById(
                    "image_telecharger_images"
                  ).style.display = "none";
                }
                supprime();
              }
            }
          });
        }
      });
    }
  });

  ///////////////publier les changements
  const changment = document.createElement("button");
  changment.type = "button";

  const modification_changment = `
<p>publier les changements</p>  `;
  changment.insertAdjacentHTML("beforeend", modification_changment);
  changment.className = "publier";

  changment.onclick = function () {};
  const changements = document.getElementById("modifer");
  changements.appendChild(changment);
}
//sortir de la page model
document.getElementById("login").addEventListener("click", function () {
  localStorage.clear();
});
