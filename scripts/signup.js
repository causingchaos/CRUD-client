//const AUTH_URL = `${API_URL}/auth`;

redirectIfLoggedIn();

$(() => {
  $('form').submit((event) => {
    console.log("signup working??")
    event.preventDefault();  
    const user = getUserFromForm();
    signup(user);
  });
});

function signup(user) {
  console.log("signing the user up")
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
      localStorage.user_id = data.id;
      window.location = `/user.html?id=${data.id}`;
    })
  })
  .catch( error => {
    console.log("there has been an error");
    const $errorMessage = $('#errorMessage')
    error.json().then( errorMessage => {
      console.log(errorMessage);
      $errorMessage.text(errorMessage.message);
      $errorMessage.show();
    })
  })
}