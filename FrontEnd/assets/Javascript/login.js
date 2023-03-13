// Récupération au clic des données utilisateurs en vue de sa connexion
document.addEventListener( 'click', function ( event ) {
    let id = event.target.getAttribute("id");
    if( id == "login-form-submit") {
        event.preventDefault();
        let email = document.querySelector("#email").value;
        let mdp = document.querySelector ("#password").value;
        login (email, mdp);    
    }
});