# Vertices Functions

## getVertices

### About
Retrieves vertices of a certain type from the graph.

### Code
```
conn.getVertices(vertex_type, callback);
```
```
conn.getVertices("Vertex Type", (data) => {
    console.log(data);
});
```

### Parameters

- vertex_type
    - Type: String
    - Description: The type of vertex
- callback
    - Type: Function
    - Description: Function of what to do with the values given.

## delVertices

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