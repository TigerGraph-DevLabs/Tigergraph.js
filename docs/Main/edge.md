# Edges Functions

## getEdges

### About
Retrieves edges of a certain type from the graph.

### Code
```
conn.getEdges(vertex_type, vertex_id, edge, callback);
```
```
conn.getEdges("Vertex Type", "Unique_ID", "_", (data) => {
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

## delEdges

### About
Echo finds the approximate time in between launches.

### Code
```
conn.echo(builtin, dynamic, statistic, callback);
```
```
conn.echo(true, true, true, (data) => {
    console.log(data);
});
```

### Parameters

- buildin
    - Type: Boolean
    - Description: Checks for endpoints preinstalled in the TigerGraph system.
- dynamic
    - Type: Boolean
    - Description: Checks for endpoints generated when compiling GSQL queries.
- static
    - Type: Boolean
    - Description: Checks for user-installed endpoints.
- callback
    - Type: Function
    - Description: Function of what to do with the values given.