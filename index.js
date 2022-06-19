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

  echo() {
    return new Promise ((resolve, reject) => {
        const options = {
            hostname: `${this.HOST}`,
            port: 9000,
            path: `/echo`,
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${this.TOKEN}`
            }
        }
        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => {
              data += chunk;
            });
            res.on('end', () => {
              if (JSON.parse(data)["error"]) reject(JSON.parse(data)["error"]);
              else return resolve(JSON.parse(data)["message"]);
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
   */
  getStatistics(seconds = 60) { // Consistently returning {} — could be a bug, will ask TG Team
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

  /**
   * 
   * @param {Boolean} builtin 
   * @param {Boolean} dynamic 
   * @param {Boolean} static 
   */
  getEndpoints(builtin = true, dynamic = true, static = true) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: this.HOST,
            port: 9000,
            path: `/endpoints?builtin=${builtin}&dynamic=${dynamic}&static=${static}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.TOKEN}`
            }
        }
        const req = https.request(options, res => {
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
  getVersion() {
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
   * @param {String} vertexType 
   */
   getVertexType(vertexType = "_") {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: `${this.HOST}`,
        port: 9000,
        path: `/graph/${this.GRAPH}/vertices/${vertexType}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.TOKEN}`
        }
      };
      const req = https.request(options, res => {
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
      req.end();
    });
  }

  /**
   * 
   * @param {String} vertexType
   * @param {String} vertexId
   * @param {JSON} attributes
   */
   upsertVertex(vertexType = "_", vertexId = "_", attributes = {}) {
    let formatted_attributes = {};
    for (let key in attributes) {
      formatted_attributes[key] = {value: attributes[key]}
    }
    let postData = JSON.stringify({vertices: {[vertexType]: {[vertexId]: formatted_attributes}}});
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
   * @param {String} sourceVertexType 
   * @param {String} sourceVertexId 
   * @param {String} edgeType 
   */
  getEdges(sourceVertexType, sourceVertexId, edgeType = "_") {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: `${this.HOST}`,
        port: 9000,
        path: `/graph/${this.GRAPH}/edges/${sourceVertexType}/${sourceVertexId}/${edgeType}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.TOKEN}`
        }
      };
      const req = https.request(options, res => {
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
      req.end();
    });
  }

  /**
   * 
   * @param {String} sourceVertexType
   * @param {String} sourceVertexId
   * @param {String} edgeType
   * @param {String} targetVertexType
   * @param {String} targetVertexId
   * @param {JSON} attributes
   */
  upsertEdge(sourceVertexType = "_", sourceVertexId = "_", edgeType = "_", targetVertexType = "_", targetVertexId = "_", attributes = {}) {
    let formatted_attributes = {};
    for (let key in attributes) {
      formatted_attributes[key] = {value: attributes[key]}
    }
    let postData = JSON.stringify({edges: {[sourceVertexType]: {[sourceVertexId]: {[edgeType]: {[targetVertexType]: {[targetVertexId]: formatted_attributes}}}}}});
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
        path: `/showprocesslist/${this.GRAPH}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.TOKEN}`
        }
      };
      const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', async () => {
          return resolve(JSON.parse(data)["results"]);
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
   * @param {Array} requestid
   */
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

  /**
   * 
   * @param {String} queryname
   * @param {JSON} params
   */
  runInstalledQuery(queryname = "MyQuery", params = {}) {
    return new Promise((resolve, reject) => {
      let endpoints = `/query/${this.GRAPH}/${queryname}`;
      if (params != {}) {
        endpoints += "?";
        let c = 0;
        for (let p in params) {
          endpoints += `${p}=${params[p]}&`;
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
      req.end();
    });
  }
}
