
document.addEventListener( 'click', function ( event ) {
    let id = event.target.getAttribute("id");
    if( id == "login-form-submit") {
        event.preventDefault();
        let email = document.querySelector("#email").value;
        let mdp = document.querySelector ("#password").value;
        login (email, mdp);    
    }
});

function login (email, mdp) {
    let data = {
        "email": email,
        "password": mdp
    }
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => console.error(err));
}


 
 

    // {
    //     "email": "sophie.bluel@test.tld",
    //     "password": "qvfqds"
    //   }