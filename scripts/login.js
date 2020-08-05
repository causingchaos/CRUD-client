const AUTH_URL = `${API_URL}/auth`;

$(() => {
  $('form').submit((event) => {
    event.preventDefault();
    console.log('submitted');
    const email = $('#email').val();
    const password = $('#password').val();

    const user = {
      email,
      password,
    }
     login2(user); 
  });
});

function login(user){
  $.post(`${AUTH_URL}/login`, user)
    .then(result => {
      console.log(result);
    }).catch( error => { console.log(error)})
}

function login2(user) {
  fetch(`${AUTH_URL}/login`, {
    method: "POST",
    body: JSON.stringify(user)
  })
    .then( response => {
      if(!response.ok) { 
        throw response 
      }  // server error 500, 200, ect.
      return response; // we only get here if there is no error
    })
    .then( response => {
      //do something with result
    })
    .catch( error => {
      // note error.text() will return a promise
      error.text().then( errorMessage => console.log(errorMessage) );
    })
}