# Sticker Mania Client

Run this on a basic web server, i.e. http-server for development
[Deployed URL](https://sticker-mania.firebaseapp.com/)

8-4-2020 added post request via fetch API and jquery API for authentication.
8-24-2020 added auth page for login/register functionality to tie in with back end node auth api's


// Note for fetch API, always use flat structure for readablity, i.e chaining fetch
Promises are about making asynchronous code retain most of the lost properties of synchronous code such as flat indentation and one exception channel.

// run async #1
asyncGetFn()
// first 'then' - execute more async code as an arg, or just accept results
// and do some other ops
.then(response => {
    // ...operate on response data...or pass data onto next promise, if needed
})
// run async #2
.then(asyncGetAnotherFn)
.then(response => {
    // ...operate on response data...or pass data onto next promise, if needed
})
// flat promise chain, followed by 'catch'
// this is sexy error handling for every 'then' above
.catch(err => {  
  console.error('Request failed', err) 
  // ...raise exeption...
  // ... or, retry promise... 
})
