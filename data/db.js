let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};
  
req.open("POST", "https://api.jsonbin.io/b/60f48536c1256a01cb725b09/1", true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("X-Master-Key", "$2b$10$qHq2aVH9OmIH.krURoNKOOGZcE7F1XjC5Utf1mhMr/iocyPLPckH2");
req.send('{"sample": "Hello World"}');

console.log('my text');