//const AUTH_URL = `${API_URL}/auth`;

redirectIfLoggedIn();

$(() => {
  $('form').submit((event) => {
    console.log('preventing event default')
    event.preventDefault();
    const user = getUserFromForm();

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
      console.log('response is okay')
      return response; // we only get here if there is no error
    })
    .then(response => {
      console.log(response.id);
      console.log('display result');
      response.json().then((data) => {
        console.log(data);
        console.log(data.id);
        console.log('storing local session with ' + data.id);
        localStorage.user_id = data.id;
        window.location = `/user.html?id=${data.id}`;
      })
      
      //window.location = `/user/html?id=`;
    })
    .catch( error => {
      const $errorMessage = $('#errorMessage');
      error.json().then( errorMessage => { // error.json() returns a promise.
        console.log(errorMessage);
        console.log(errorMessage.message);
        $errorMessage.text(errorMessage.message);
        $errorMessage.show();
        });
    })
}