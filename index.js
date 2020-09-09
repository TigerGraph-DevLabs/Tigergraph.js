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

class createTigerGraphConnection {
  constructor(host = "localhost", graph = "MyGraph", username = "tigergraph", password = "tigergraph", secret, token) {
    this.HOST = host;
    this.GRAPH = graph;
    this.USERNAME = username;
    this.PASSWORD = password;
    this.SECRET = secret;
    this.TOKEN = token;
  }
  echo(builtin = true, dynamic = true, static_param = true, callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/endpoints?builtin=${builtin}&dynamic=${dynamic}&static=${static_param}`,
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
      res.on('end', () => {
        return callback(JSON.parse(data));
      });
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }
  statistic(seconds = 60, callback = (ans) => { console.log(ans); }) {
    if (seconds > 60 || seconds < 0) {
      console.error("Seconds must be between 0-60 inclusive.")
    } else {
      const options = {
        hostname: this.HOST,
        port: 9000,
        path: `/statistics/${this.GRAPH}?seconds=${seconds}`,
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
    }
  }
  getEndpoints(callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: this.HOST,
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
  }
  version(callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: this.HOST,
      port: 9000,
      path: '/version',
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
        return callback(data);
      });
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }

  /**
   * VERTICES
   */

  /**
   * 
   * @param {String} vertex 
   * @param {function} callback 
   */
  getVertices(vertex = "_", callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
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
        if (JSON.parse(data)["error"]) {
          console.error(JSON.parse(data)["message"]);
        } else {
          return callback(JSON.parse(data)["results"]);
        }
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

  /**
   * EDGES
   */

  /**
   * 
   * @param {String} vertex_type 
   * @param {String} vertex_id 
   * @param {String} edge 
   * @param {function} callback 
   */
  getEdges(vertex_type, vertex_id, edge = "_", callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
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
        if (JSON.parse(data)["error"]) {
          console.error(JSON.parse(data)["message"]);
        } else {
          return callback(JSON.parse(data)["results"]);
        }
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


  /**
   * QUERIES
   */


  showProcessesList(callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/showprocesslist`,
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
        return callback(JSON.parse(data));
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

  abortQuery(requestid = ["all"], callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/abortquery/${this.GRAPH}?requestid=${requestid.join("&")}`,
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
        return callback(JSON.parse(data));
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

  runQuery(queryname = "MyQuery", parameters = {}, callback = (ans) => { console.log(ans); }) {
    let endpoints = `/query/${this.GRAPH}/${queryname}`;
    if (parameters != {}) {
      endpoints += "?";
      let c = 0;
      for (let i in parameters) {
        // console.log(i);
        endpoints += `${i}=${parameters[i]}&`;
      }
    }
    endpoints = endpoints.slice(0, -1);
    // console.log(endpoints);
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: endpoints,
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
        if (JSON.parse(data)["error"]) {
          console.error(JSON.parse(data)["message"]);
        } else {
          return callback(JSON.parse(data)["results"]);
        }
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

exports.createTigerGraphConnection = createTigerGraphConnection;


// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }