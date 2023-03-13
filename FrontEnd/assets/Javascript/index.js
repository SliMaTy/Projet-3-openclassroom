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
        modal.style.display = "none"
    }
    // Gestion de la suppression d'une image
    if (event.target.getAttribute("data-image-remove")) {
        let id = event.target.getAttribute("data-image-remove")
        removeImage(id)

    }
    // Gestion de la déconnexion 
    if (event.target.getAttribute("data-login") == "true") {
        localStorage.removeItem ("token")
        location.reload();
    }

  });

// Gestion déconnexion/connexion
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


