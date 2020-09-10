# TigerGraph.js: Get Started!

## About
An open-source wrapper for TigerGraph. This library allows users to easily use TigerGraph in Node.js and (currently yet to be tested) in the browser.

## Install 
```
npm install tigergraph.js
```

## Usage

First, have your information in a document (called config.js):

```
const credentials = {
    token: "INSERT_TOKEN_HERE",
    secret: "INSERT_SECRET_HERE",
    password: "INSERT_PASSWORD_HERE"
}

module.exports = credentials;
```
While creating your box, you will create a password which you can copy and paste above. To create a secret, go GraphStudio, then Admin --> User Management --> Create Secret, and press Create and copy the secret into the config.js file. Finally, using your secret, you can create a token.

To create a connection, you'll need a token. To generate a token, run the following code:

```
const tgjs = require("tigergraph.js");
const cred = require("./config.js");

tgjs.getToken(cred.secret); // A token will show on your console. Copy and paste it. 
```

From there, you can create a connection with your graph, then query it, and add and delete vertices and edges.
```
const tgjs = require("tigergraph.js");
const cred = require("./config.js");

const conn = new tgjs.createTigerGraphConnection("DOMAIN.i.tgcloud.io", "MyGraph", "tigergraph", cred.password, cred.secret, cred.token);
```

Now you're ready to go! Check out the documentation or look at some example projects to get you inspired!

## Projects

- Introduction to TigerGraph.js
- Combining TigerGraph.js and Discord.js
- Creating a Recommendation App with TigerGraph.js
