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
     login2(user)
     /* .then(result => {
        console.log(result);
      }).catch( error => { 
        const $errorMessage = $('#errorMessage');
        console.error(error)
        $errorMessage.text(error.responseJSON.message);
        $errorMessage.show();
        
    });
    */
  });
});

function login(user){
  return $.post(`${AUTH_URL}/login`, user)
}

function login2(user) {
  fetch(`${AUTH_URL}/login`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:8080",
    },
    credentials: "include",
    method: "post",
    body: `email=${user.email}&password=${user.password}`
  })
    .then( response => {
      if(!response.ok) { 
        throw response 
      }  // server error 500, 200, ect.
      return response; // we only get here if there is no error
    })
    .then(response => {
      console.log('display result');
      response.json().then((data) => {
        console.log(data);
      })
    })
    .catch( error => {
      // note error.text() will return a promise
      error.text().then( errorMessage => console.log(errorMessage) );
    })
}