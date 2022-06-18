const https = require("https")

exports.TigerGraphConnection = (host = "localhost", graphname = "MyGraph", username = "tigergraph", password = "tigergraph") => {
  let postData = JSON.stringify({
    graph: graphname
  });

  return new Promise((resolve, reject) => {
    if (host.substring(0, 8) === "https://") {
      host = host.substring(8, host.length);
    } else if (host.substring(0, 7) === "http://") {
      reject("Invalid url, currently only https:// domains are supported");
    } 

    if (host[host.length-1] === '/') {
      host = host.substring(0, host.length-1);
    }

    let options = {
      hostname: host,
      port: 9000,
      path: '/requesttoken',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
    };

    let req = https.request(options, (res) => {  
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', async () => {
        return resolve(new TigerGraphConnection(host, graphname, username, password, JSON.parse(data)["results"]["token"]));
      });
    });
  
    req.on('error', (e) => {
      reject(e);
    });
  
    req.write(postData);
    req.end();
  });
};

class TigerGraphConnection {

  /**
   * Connect to the TG Cloud Solution
   * @param {String} host 
   * @param {String} graph 
   * @param {String} username 
   * @param {String} password 
   * @param {String} token 
   */  
  constructor(host = "localhost", graph = "MyGraph", username = "tigergraph", password = "tigergraph", token = "") {
    this.HOST = host;
    this.GRAPH = graph;
    this.USERNAME = username;
    this.PASSWORD = password;
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
        req.on('error', (e) => {
          reject(e);
        });
        req.end();
    });
  }

  /**
   * 
   * @param {Integer} seconds 
   * @returns 
   */
  statistic(seconds = 60) { // Consistently returning {} — could be a bug, will ask TG Team
    const options = {
      hostname: this.HOST,
      port: 9000,
      path: `/statistics/${this.GRAPH}?seconds=${seconds}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    }
    return new Promise((resolve, reject) => {
      if (seconds > 60 || seconds < 0) {
        reject("Seconds must be between 0-60 inclusive.");
      } else {
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
        req.on('error', (e) => {
          reject(e);
        });
        req.end();
      }
      
  });
    
  }
  getEndpoints() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: this.HOST,
            port: 9000,
            path: '/endpoints/' + this.GRAPH,
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
        req.on('error', (e) => {
          reject(e);
        });
        req.end();
    });
  }
  version() {
    return new Promise((resolve, reject) => {
        const options = {
        hostname: this.HOST,
        port: 9000,
        path: '/version/' + this.GRAPH,
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
        req.on('error', (e) => {
          reject(e);
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
        res.on('error', (e) => {
          reject(e);
        });
      });
      req.on('error', (e) => {
        reject(e);
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
    let postData = JSON.stringify({vertices: {[vertex_name]: {[vertex_id]: attributes}}});
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
        console.log(`statusCode: ${res.statusCode}`);
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', async () => {
          if (JSON.parse(data)["error"]) {
            reject(JSON.parse(data)["message"]);
          } else {
            return resolve(JSON.parse(data)["results"]);
          }
        });
        res.on('error', (e) => {
          reject(e);
        });
      });
      req.on('error', (e) => {
        reject(e);
      });    
      req.write(postData);
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
        res.on('error', (e) => {
          reject(e);
        });
      });
      req.on('error', (e) => {
        reject(e);
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
  upsertEdge(source_vertex_name = "_", source_vertex_id = "_", edge_name, target_vertex_name = "_", target_vertex_id = "_", attributes = {}) {
    let postData = JSON.stringify({edges: {[source_vertex_name]: {[source_vertex_id]: {[edge_name]: {[target_vertex_name]: {[target_vertex_id]: attributes}}}}}});
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
        console.log(`statusCode: ${res.statusCode}`);
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', async () => {
          if (JSON.parse(data)["error"]) {
            reject(JSON.parse(data)["message"]);
          } else {
            return resolve(JSON.parse(data)["results"]);
          }
        });
        res.on('error', (e) => {
          reject(e);
        });
      });
      req.on('error', (e) => {
        reject(e);
      });    
      req.write(postData);
      req.end();
    });
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
      res.on('error', (e) => {
        reject(e);
      });
    });
    req.on('error', (e) => {
      reject(e);
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
      res.on('error', (e) => {
        reject(e);
      });
    });
    req.on('error', (e) => {
      reject(e);
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
      res.on('error', (e) => {
        reject(e);
      });
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.end();
});
  }
}

// exports.createTigerGraphConnection = createTigerGraphConnection;
