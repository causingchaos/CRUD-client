console.log("hello world")
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnSet').addEventListener('click', fSet);
  document.getElementById('btnAdd').addEventListener('click',fAdd);
  let pre = document.getElementById('output');
  pre.textContent = document.cookie;
})

const API_URL = getHostURL();

function getHostURL() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://sticker-mania.herokuapp.com';
  }
}

function getUserFromForm(){

  const email = $('#email').val();
  const password = $('#password').val();

  const user = {
    email,
    password,
  }

  return user;
}

function fSet() {
  let key = 'score';
  let value = encodeURIComponent(
    (Math.floor(Math.random() * 123456) + 123456).toString()
  );
  let thirty = 60 * 60 * 24 * 30;
  document.cookie = `${key}=${value};path=/;max-age=${thirty};`; //one cookie at a time
  document.getElementById('output').textContent = document.cookie;
}

function fAdd(){
  console.log(API_URL);
  let url = `${API_URL}/set`;
  let req = new Request(url, {
    mode: 'cors',   // just a safe guard indicating our intentions of what to allow
    credentials: 'include', //when will the cookies and authorization header be sent
  });
  fetch(req)
    .then((resp) => {
      resp.headers.forEach((val, key) => {
        console.log(key,val);
      });
    });
}