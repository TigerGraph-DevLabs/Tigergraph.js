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
    password: "INSERT_PASSWORD_HERE"
}

module.exports = credentials;
```

Next, create a connection
```
const tgjs = require("tigergraph.js");
const cred = require("./config.js");

tgjs.TigerGraphConnection("DOMAIN.i.tgcloud.io", "MyGraph", "tigergraph", cred.password).then((conn) => {
    // Code here
});
```

Now you're ready to go! Check out the documentation or look at some example projects to get inspired!
