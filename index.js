const https = require("https")

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

exports.createTigerGraphConnection = {
  /**
  * Sets up client. 
  * @param {String} domain
  * @param {String} graph
  * @param {String} username
  * @param {String} password 
  * @param {String} secret
  * @param {String} token  
  */
  init: function (domain = "localhost", graph = "MyGraph", username = "tigergraph", password = "tigergraph", secret, token) {
    this.DOMAIN = domain;
    this.GRAPH = graph;
    this.USERNAME = username;
    this.PASSWORD = password;
    this.SECRET = secret;
    this.TOKEN = token;
    return "Success";
  },
  getEndpoints: function (callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.DOMAIN}`,
      port: 9000,
      path: '/endpoints',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    }
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        return callback(JSON.parse(data));
      });
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  },
  getVertices: function (vertex = "_", callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.DOMAIN}`,
      port: 9000,
      path: `/graph/${this.GRAPH}/vertices/${vertex}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    };
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        return callback(JSON.parse(data)["results"]);
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  },
  getEdges: function (vertex_type, vertex_id, edge = "_", callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.DOMAIN}`,
      port: 9000,
      path: `/graph/${this.GRAPH}/edges/${vertex_type}/${vertex_id}/${edge}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    };
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        return callback(JSON.parse(data)["results"]);
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }
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