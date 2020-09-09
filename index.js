const https = require("https")

let DOMAIN = "";
let USERNAME = "";
let PASSWORD = "";
let SECRET = "";
let TOKEN = "";

exports.getToken = (secret, domain = "localhost", lifetime = 1000000, callback = (ans) => { console.log(ans); }) => {
  https.get(`https://${domain}.i.tgcloud.io:9000/requesttoken?secret=${secret}&lifetime=${lifetime}`, async (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', async () => {
      return callback(JSON.parse(data)["token"])
    })
  });
}

// exports.getToken = (secret, domain = "localhost", lifetime = 1000000) => {
//   const https = require('https');

//   https.get(`https://${domain}.i.tgcloud.io:9000/requesttoken?secret=${secret}&lifetime=${lifetime}`, (resp) => {
//     let data = '';
//     resp.on('data', (chunk) => {
//       data += chunk;
//     });
//     resp.on('end', () => {
//       let ans = await JSON.parse(data)["token"];
//       console.log(ans);
//       return ans;
//     });

//   }).on("error", (err) => {
//     console.error(err);
//   });
// } 

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