
// Création de la barre d'édition
function adminBar () {
    let bar = document.querySelector ("[data-admin-bar]")
    bar.innerHTML =
        '<ul>'+
			'<li>'+
				'<a href="#modal1" data-modal="open">'+
					'<span><i class="fa-regular fa-pen-to-square"></i></span>'+
					'<span>Mode édition</span>'+
				'</a>'+
			'</li>'+

			'<li> <input type="button" value="publier les changements"></li>'+
		'</ul>'
}

// Création d'une galerie d'image en vue d'une modification 
function createImageLogged(donnee) {
    let figure = document.createElement("figure");
    figure.setAttribute("data-category", donnee.categoryId);
    figure.setAttribute("data-image-id", donnee.id);

    let actions = document.createElement("div");
    actions.setAttribute("class", "gallery-modifier-actions")

    let remove = document.createElement("i");
    remove.setAttribute("data-image-remove", donnee.id)
    remove.setAttribute("class", "fa-solid fa-trash-can")

    let move = document.createElement("i");
    move.setAttribute("class", "fa-solid fa-arrows-up-down-left-right")


    let image = document.createElement("img");
    image.setAttribute("src", donnee.imageUrl);
    image.setAttribute("alt", donnee.title);

    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = "éditer";

    actions.appendChild(move);
    actions.appendChild(remove);
    figure.appendChild(actions);
    figure.appendChild(image);
    figure.appendChild(figcaption);

    let gallery = document.querySelector(".gallery-modifier");
    gallery.appendChild(figure);
}

// Utilisation de la route works/id pour supprimer une image
function removeImage(id) {
    let token = localStorage.getItem("token")
    fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Authentication': token,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch(err => console.error(err));
}

// Retourne true si l'utilisateur est connecté
function isLogged () {
    let token = localStorage.getItem("token")
    if (!!token) {
        return true
    }
    return false
}

// Création d'une galerie d'image
function createImage (donnee) {
    let figure = document.createElement ("figure");
    figure.setAttribute ("data-category", donnee.categoryId);
    let image = document.createElement ("img");

    let figcaption = document.createElement ("figcaption");
    image.setAttribute ("src", donnee.imageUrl);
    image.setAttribute("alt", donnee.title);
    figcaption.innerHTML = donnee.title;
    figure.appendChild (image);
    figure.appendChild (figcaption);
    
    let gallery = document.querySelector(".gallery");
    gallery.appendChild (figure);
}

// Création de la liste des filtres par catégories
function createFiltre (donnee) {
    let li = document.createElement ("li");
    li.innerHTML = donnee.name;
    li.setAttribute("data-filtre", donnee.id)
    if (donnee.class == "active") {
        li.setAttribute("class", "active")
    }

    let filtre = document.querySelector(".filtre")
    filtre.appendChild (li);
}

// Permet à un utilsateur de se connecter en utilisant l'API
function login (email, mdp) {
    let data = {
        "email": email,
        "password": mdp
    }
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (!!data.userId) {
            localStorage.setItem("token", data.token);
            location.href = "../../index.html";
          } else {
            error.innerText = " Erreur dans l’identifiant ou le mot de passe";
          }
    })
    .catch(err => console.error(err));
}