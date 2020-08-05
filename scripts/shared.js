const API_URL = getHostURL();

function getHostURL() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://sticker-mania.herokuapp.com';
  }
}