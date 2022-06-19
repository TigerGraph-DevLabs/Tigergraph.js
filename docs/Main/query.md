# Queries Functions

## runQuery

### About
Runs a query from the graph.

### Code
```
conn.runQuery(queryname, params);
```
```
conn.runQuery("MyQuery", {param: "parameter"}).then((data) => console.log(data));
```

### Parameters

- queryname
    - Type: String
    - Description: The name of the query desired to run
- params
    - Type: JSON Object
    - Description: An object of {parameter_name: parameter_value} for the parameters to be passed to the query. 
    - Note: If no parameters, pass {}.

## abortQuery

### About
Aborts a query.

### Code
```
conn.getEdges(vertex_type, vertex_id, edge);
```
```
conn.getVertices("Vertex Type", "Unique_ID", "_").then((data) => console.log(data));
```

### Parameters

- requestid
    - Type: Array
    - Description: IDs of queries to abort
    - Note: To abort all, use ["all"]

## showProcessesList

### About
Shows all the queries running.

### Code
```
conn.showProcessesList();
```
```
conn.showProcessesList().then((data) => console.log(data));
```

### Parameters

None
