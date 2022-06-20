# Tigergraph.js

[![npm version](https://img.shields.io/npm/v/tigergraph.js.svg?style=flat-square)](https://www.npmjs.org/package/tigergraph.js)
[![npm downloads](https://img.shields.io/npm/dm/tigergraph.js.svg?style=flat-square&color=orange)](https://npm-stat.com/charts.html?package=tigergraph.js)
[![discord](https://img.shields.io/discord/811989166782021633?label=discord)](https://discord.gg/tigergraph)

A Javascript wrapper for TigerGraph aimed to simplify the TigerGraph-JavaScript development process

Check out the documentation here: https://tigergraph-devlabs.github.io/Tigergraph.js/

## Quickstart

### Installation

```
npm install tigergraph.js
```

### Usage

Import tigergraph.js, create a connection, then run commands!

```
const tgjs = require("tigergraph.js");

tgjs.TigerGraphConnection("DOMAIN.i.tgcloud.io", "MyGraph", "tigergraph_username", "tigergraph_password").then((conn) => {
    conn.echo().then(data => console.log(data));
});
```
