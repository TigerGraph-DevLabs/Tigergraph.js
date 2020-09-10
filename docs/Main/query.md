# Queries Functions

## runQuery

### About
Runs a query from the graph.

### Code
```
conn.runQuery(query_name, parameters, callback);
```
```
conn.runQuery("MyQuery", {}, (data) => {
    console.log(data);
});
```

### Parameters

- query_name
    - Type: String
    - Description: The name of the query desired to run
- parameters
    - Type: JSON Object
    - Description: An object of {parameter_name: parameter_value} for the parameters to be passed to the query. 
    - Note: If no parameters, pass {}.
- callback
    - Type: Function
    - Description: Function of what to do with the values given.

## abortQuery

### About
Shows all the queries running.

### Code
```
conn.getEdges(vertex_type, vertex_id, edge, callback);
```
```
conn.getVertices("Vertex Type", "Unique_ID", "_", (data) => {
    console.log(data);
});
```

### Parameters

- vertex_type
    - Type: String
    - Description: The type of the vertices
- vertex_id
    - Type: String
    - Description: The unqiue id of the vertex
- edge
    - Type: String
    - Description: The edge types desired
    - Note: "_" will return all edges
- callback
    - Type: Function
    - Description: Function of what to do with the values given.

## showProcessesList

### About
Shows all the queries running.

### Code
```
conn.getEdges(vertex_type, vertex_id, edge, callback);
```
```
conn.getVertices("Vertex Type", "Unique_ID", "_", (data) => {
    console.log(data);
});
```

### Parameters

- vertex_type
    - Type: String
    - Description: The type of the vertices
- vertex_id
    - Type: String
    - Description: The unqiue id of the vertex
- edge
    - Type: String
    - Description: The edge types desired
    - Note: "_" will return all edges
- callback
    - Type: Function
    - Description: Function of what to do with the values given.