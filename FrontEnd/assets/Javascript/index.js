// Appel de l'API pour récupérer les images et les afficher
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            createImage(element);
        });
    })
    .catch(err => console.error(err));

// Appel de l'API pour récupérer les catégories et les afficher
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        let tous = {id: 0, name: "Tous", class:"active"};
        createFiltre (tous);
        data.forEach(element => {
            createFiltre(element);
        });   
    })
    .catch(err => console.error(err));

// Récupération du click sur un élément
document.addEventListener( 'click', function ( event ) {
    // Gestion des catégories
    if( event.target.getAttribute("data-filtre")) {
        var filtreActive = event.target.getAttribute("data-filtre")

        if (filtreActive == 0) {
            let all = document.querySelectorAll (".gallery figure")
            all.forEach (element => {
                element.style.display = "block";
            })

            let allFiltre = document.querySelectorAll (".filtre li")
            allFiltre.forEach (element => {
                element.classList.remove("active");
            })

            let category = document.querySelector (".filtre li[data-filtre='"+filtreActive+"']")
            category.classList.add("active");

        }
        else {
                    
            let all = document.querySelectorAll (".gallery figure")
            all.forEach (element => {
                element.style.display = "none";
            })

            let images = document.querySelectorAll (".gallery figure[data-category='"+filtreActive+"']")
            images.forEach (element => {
                element.style.display = "block";
            })

            let allFiltre = document.querySelectorAll (".filtre li")
            allFiltre.forEach (element => {
                element.classList.remove("active");

            })
            let category = document.querySelector (".filtre li[data-filtre='"+filtreActive+"']")
            category.classList.add("active");
        }
    }
    // Gestion ouverture de la modale
    if (event.target.parentNode.getAttribute("data-modal") == "open") {
        let modal = document.querySelector("#modal1")
        modal.style.display = "flex" 

        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    createImageLogged(element);
                });
            })

            .catch(err => console.error(err));
    }
    // Gestion fermeture de la modale
    if (event.target.getAttribute("data-modal") == "close") {
        let modal = document.querySelector("#modal1")
        let modal2 = document.querySelector("#modal2")
        modal.style.display = "none"
        modal2.style.display ="none"
    }
    // Gestion de la suppression d'une image
    if (event.target.getAttribute("data-image-remove")) {
        let id = event.target.getAttribute("data-image-remove")
        removeImage(id)
    }
    // Gestion ouverture modal ajouter une photo
    if (event.target.getAttribute("data-modal") == "modal2") {
        let modal = document.querySelector("#modal1")
        let modal2 = document.querySelector("#modal2")
        modal2.style.display = "flex"
        modal.style.display	= "none"

        // Récupération des catégories pour le select
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(data => {
                let select = document.querySelector ("[data-select-category]")
                data.forEach(element => {
                    let option = document.createElement ("option")
                    option.setAttribute("value", element.id)
                    option.innerHTML = element.name 
                    select.appendChild(option)
                })
            })
            .catch(err => console.error(err));
    }
    // Gestion de la déconnexion 
    if (event.target.getAttribute("data-login") == "true") {
        localStorage.removeItem("token")
        location.reload();
    }
    if (event.target.getAttribute("data-input-valider")) {
        createImageFile ()
        console.log (createImageFile)
    }
  });

// Gestion déconnexion/connexion
let logout = document.querySelector ("[data-login='true']")
let log = document.querySelector ("[data-login='false']")
if (isLogged()) {
    adminBar ()
    logout.style.display = "block"
    log.style.display = "none"
}
else {
    logout.style.display = "none"
    log.style.display = "block"
}