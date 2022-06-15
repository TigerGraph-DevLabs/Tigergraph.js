const https = require("https")

/**
 * 
 * @param {String} secret 
 * @param {String} domain 
 * @param {Integer} lifetime 
 * @returns 
 */
exports.getToken = (secret, domain = "localhost", lifetime = 1000000) => {
    return new Promise((resolve, reject) => {
        https.get(`https://${domain}.i.tgcloud.io:9000/requesttoken?secret=${secret}&lifetime=${lifetime}`, async (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
            data += chunk;
            });
            resp.on('end', async () => {
            return resolve(JSON.parse(data)["token"]);
            })
        });
    });
};

class createTigerGraphConnection {

  /**
   * Connect to the TG Cloud Solution
   * @param {String} host 
   * @param {String} graph 
   * @param {String} username 
   * @param {String} password 
   * @param {String} secret 
   * @param {String} token 
   */  
  constructor(host = "localhost", graph = "MyGraph", username = "tigergraph", password = "tigergraph", secret, token) {
    this.HOST = host;
    this.GRAPH = graph;
    this.USERNAME = username;
    this.PASSWORD = password;
    this.SECRET = secret;
    this.TOKEN = token;
  }

  /**
   * 
   * @param {Boolean} builtin 
   * @param {Boolean} dynamic 
   * @param {Boolean} static_param 
   * @returns 
   */
  echo(builtin = true, dynamic = true, static_param = true) {
    return new Promise ((resolve, reject) => {
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
            return resolve(JSON.parse(data));
            });
        });
        req.on('error', error => {
            console.error(error);
        });
        req.end();
    });
  }

  /**
   * 
   * @param {Integer} seconds 
   * @returns 
   */
  statistic(seconds = 60) {
    if (seconds > 60 || seconds < 0) {
      console.error("Seconds must be between 0-60 inclusive.")
    } else {
        return new Promise((resolve, reject) => {
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
                return resolve(JSON.parse(data));
                });
            });
            req.on('error', error => {
                console.error(error);
            });
            req.end();
        });
    }
  }
  getEndpoints() {
    return new Promise((resolve, reject) => {
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
                return resolve(JSON.parse(data));
            });
        });
        req.on('error', error => {
            console.error(error);
        });
        req.end();
    });
  }
  version() {
    return new Promise((resolve, reject) => {
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
                return resolve(data);
            });
        });
        req.on('error', error => {
        console.error(error);
        });
        req.end();
    });
  }

  /**
   * VERTICES
   */

  /**
   * 
   * @param {String} vertex 
   */
  getVertices(vertex = "_") {
      return new Promise((resolve, reject) => {
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
          return resolve(JSON.parse(data)["results"]);
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
      });
  }

  /**
   * 
   * @param {String} vertex_name
   * @param {String} vertex_id
   * @param {JSON} attributes
   */
   upsertVertex(vertex_name = "_", vertex_id = "_", attributes = {}) {
    return new Promise((resolve, reject) => {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/graph/${this.GRAPH}`,
      method: 'POST',
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
          return resolve(JSON.parse(data)["results"]);
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
    });
  }

  /**
   * EDGES
   */

  /**
   * 
   * @param {String} vertex_type 
   * @param {String} vertex_id 
   * @param {String} edge 
   */
  getEdges(vertex_type, vertex_id, edge = "_") {
      return new Promise((resolve, reject) => {
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
          return resolve(JSON.parse(data)["results"]);
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
})
  }


  /**
   * QUERIES
   */


  showProcessesList() {
    return new Promise((resolve, reject) => {
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
        return resolve(JSON.parse(data));
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
});
  }

  abortQuery(requestid = ["all"]) {
    return new Promise((resolve, reject) => {
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
        return resolve(JSON.parse(data));
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
});
  }

  runQuery(queryname = "MyQuery", parameters = {}) {
    return new Promise((resolve, reject) => {
    let endpoints = `/query/${this.GRAPH}/${queryname}`;
    if (parameters != {}) {
      endpoints += "?";
      let c = 0;
      for (let params in parameters) {
        endpoints += `${params}=${parameters[params]}&`;
      }
    }
    endpoints = endpoints.slice(0, -1);
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
          return resolve(JSON.parse(data)["results"]);
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
});
  }
}

exports.createTigerGraphConnection = createTigerGraphConnection;
