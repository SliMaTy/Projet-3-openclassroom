
let logout = document.querySelector ("[data-login='true']")
let login = document.querySelector ("[data-login='false']")

if (isLogged()) {
    adminBar ()
    logout.style.display = "block"
    login.style.display = "none"
}
else {
    logout.style.display = "none"
    login.style.display = "block"
}

function adminBar () {
    let bar = document.querySelector ("[data-admin-bar]")
    console.log(bar)
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

document.addEventListener('click', function (event) {
    if (event.target.parentNode.getAttribute("data-modal") == "open") {
        console.log("modal")
        let modal = document.querySelector("#modal1")
        modal.style.display = "flex" 

        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data[0].title)
                data.forEach(element => {
                    createImageLogged(element);
                });
            })

            .catch(err => console.error(err));
    }
    if (event.target.getAttribute("data-modal") == "close") {
        console.log(event.target)
        let modal = document.querySelector("#modal1")
        modal.style.display = "none"
    }
    if (event.target.getAttribute("data-image-remove")) {
        let id = event.target.getAttribute("data-image-remove")
        removeImage(id)

    }

    if (event.target.getAttribute("data-login") == "true") {
        localStorage.removeItem ("token")
        location.reload();
    }
})



// barre admin









// barre admin

//   modale 1





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

function removeImage(id) {
    let token = localStorage.getItem("token")
    console.log(token)
    fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Authentication': token,
            'Content-Type': 'application/json'
        },
    })

        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.error(err));

}


//   modale 1


//   modale 2














//   modale 2