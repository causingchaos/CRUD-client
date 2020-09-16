//const API_URL = getHostURL(); 

$(document).ready(function () {
  // get user id from url query
  const params = parseQuery(window.location.search);
  console.log("params of this api request are:")
  console.log(params);
  // make a request to the server for the user information
  getUserInfo3(params.id)
    //.then(addUserInfoToPage)
    //.then(getStickers2)
    //.then(addStickers)
    .catch(handleError)
  // show user information
  // make a request to server for the stickers for the user with that id
  // show user stickers
});

function parseQuery(query) {
  return query.substr(1).split('&').reduce((params, keyValue) => {
    const parts = keyValue.split('=');
    params[parts[0]] = parts[1];
    return params
  }, {});
}

function getUserInfo(id) {
  console.log("getting user info")
  console.log('id');
  console.log(`${API_URL}/user/${id}`)
  var x = document.cookie;
  console.log(x);
  return $.get(`${API_URL}/user/${id}`)
}

function getUserInfo3(id){
  return fetch(`${API_URL}/user/${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:8080",
    },
    credentials: "include",
    method: "get",
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      //throw new Error('Something went wrong'); // ??? proper stucture ??
      throw Error(res.statusText);
      //return res.json();
    }
  })
  .then((content) =>  {
    //console.log('displaying content');
    //console.log(content);
    //if (content.error){
    //  console.log("error found");  // custom errors here, otherwise use the throw error above from headers
    //  throw Error(content.message); // probably don't need custom errors here, b/c it will redirect
    //} else {
      addUserInfoToPage(content);
      return content; //return the data promise
   // }
  })
  //.catch(error => console.log(error))
}

function getStickers(id) {
  console.log("getting user stickers")
  return $.get(`${API_URL}/user/${id}/sticker`)
}

function getStickers2(id) {
  console.log("getting user stickers")
  console.log("api url:");
  console.log(API_URL)
  return fetch(`${API_URL}/user/${id}/sticker`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:8080",
    },
    credentials: "include",
    method: "get",
  })
  .then((res) => res.json())
  .then((content) => {
    console.log(content);
    return content;
  })
}

function addUserInfoToPage(user) {
  console.log('Inside add user Info to page function')
  console.log(user);
  let source = $("#user-template").html();
  let template = Handlebars.compile(source);
  let context = user;
  let html = template(context);
  $('.user').html(html);
  return user.id;
}

function addStickers(stickers) {
  let source = $("#sticker-template").html();
  let template = Handlebars.compile(source);
  let context = {stickers};
  // yay more variations!! abstraction rocks!
  // let context = {stickers: stickers};
  let html = template(context);
  $('.stickers').html(html);
}

function handleError(error) {
  console.log("there has been an error");
  console.log(error);
  console.log(error.message);
  //console.error;
  window.location = '/login.html';
}
