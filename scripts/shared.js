console.log("hello world")
document.addEventListener('DOMContentLoaded', () => {
  //document.getElementById('btnSet').addEventListener('click', fSet);
  //document.getElementById('btnAdd').addEventListener('click',fAdd);
  //document.getElementById('btnDelete').addEventListener('click',fDelete);
  //let pre = document.getElementById('output');
  //pre.textContent = document.cookie;
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
  console.log(email)
  const password = $('#password').val();
  console.log(password);

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
  /**
   ;path= absolute path. current path by default
   ;domain=sub.example current domain by default
   ;max-age= seconds 60*60*24*30 30 days
   ;expires= UTC date end of current session by default
   ;secure=true;
   ;same-site=Strict | Lax
   **/
}

function fAdd(){
  console.log(API_URL);
  let url = `${API_URL}/set`;
  let req = new Request(url, {
    mode: 'cors',   // just a safe guard indicating our intentions of what to allow
    credentials: 'include', //when will the cookies and authorization header be sent
  });
  //return resp.json();

  fetch(req)
    .then((resp) => {
      resp.headers.forEach((val, key) => {
        console.log(key,val);
      });
      let cookie = resp.headers.get('set-cookie');
      console.log('set-cookie header value', cookie);

      return resp.json();
    });
    /**
      credentials: "same-origin", "omit" (never send), "include" (always send)  -- cookies, Authorization (combined)
      mode: "cors", "no-cors", "same-origin"
      default 7 visible headers for CORS requests
        cache-control, content-language, content-length, content-type, expires, last_modified, pragam

        set-cookie and set-cookie2 will NEVER be accessible to JS4
     */
}

function fDelete() {
  let url = `${API_URL}/delete/token`;
  let req = new Request(url, {
    mode: 'cors',   // cors = cros origin request
    credentials: 'include'
  });
  fetch(req)
    .then((resp) => {
      resp.headers.forEach((val, key) => {
        console.log(key,val);
      });
      let cookie = resp.headers.get('set-cookie');
      console.log(cookie);
      
      return resp.json();
    })
    
}
