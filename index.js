let DOMAIN = "";
let USERNAME = "";
let PASSWORD = "";
let SECRET = "";
let TOKEN = "";

exports.getToken = (secret, domain = "localhost", lifetime = 1000000) => {
  const https = require('https');

  https.get(`https://${domain}.i.tgcloud.io:9000/requesttoken?secret=${secret}&lifetime=${lifetime}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(data)["token"]);
    });

  }).on("error", (err) => {
    console.error(err);
  });
} 

exports.createTigerGraphConnection = (domain, username, password, secret, token) => {
  DOMAIN = domain;
  USERNAME = username;
  PASSWORD = password;
  SECRET = secret;
  TOKEN = token;
}

exports.printMsg = function() {
  console.log("This is a message from the demo package");
}