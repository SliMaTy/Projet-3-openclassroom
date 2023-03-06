fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data[0].title)
        data.forEach(element => {
            createImage(element);
        });
    })

    .catch(err => console.error(err));

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


fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let tous = {id: 0, name: "Tous", class:"active"};
        createFiltre (tous);
        data.forEach(element => {
            createFiltre(element);
        });   
    })

    .catch(err => console.error(err));


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



document.addEventListener( 'click', function ( event ) {
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
            
            // je retire la classe active a tt le monde
            // je mets la class active a celui ou j'ai cliqué
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


            // je retire la classe active a tt le monde
            // je mets la class active a celui ou j'ai cliqué

        }


        
    };
  });
