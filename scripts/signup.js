const AUTH_URL = `${API_URL}/auth`;

$(() => {
  $('form').submit((event) => {
    event.preventDefault();  
    const user = getUserFromForm();
    signup(user);
  });
});

function signup(user) {
  fetch(`${AUTH_URL}/signup`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:8080",
    },
    credentials: "include",
    method: "post",
    body: `email=${user.email}&password=${user.password}`
  })
  .then( response => {
    if(!response.ok) { // if response is not okay throw error ( error 500, 200, ect)
      throw response;
    }
    return response;
  })
  .then( result => {
    console.log('display result');
    result.json().then( data => {
      console.log(data);
      console.log(data.id);
      window.location = `/user.html?id=${data.id}`
    })
  })
  .catch( error => {
    const $errorMessage = $('#errorMessage')
    error.json().then( errorMessage => {
      console.log(errorMessage);
      $errorMessage.text(errorMessage.message);
      $errorMessage.show();
    })
  })
}