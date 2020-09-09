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
    url: "https://DOMAIN.i.tgcloud.io"
}

module.exports = credentials;
```

To create a connection, you'll need a token. To generate a token, run the following code:

```
const tgjs = require("tigergraph.js")

tgjs.getToken(); // A token will show on your monitor. Copy and paste it. 
```

