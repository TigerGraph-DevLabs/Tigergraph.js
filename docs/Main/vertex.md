# Vertices Functions

## getVertexType

### About
Retrieves vertices of a certain type from the graph.

### Code
```
conn.getVertexType(vertexType);
```
```
conn.getVertexType("Vertex Type").then((data) => console.log(data));
```

### Parameters

- vertexType
    - Type: String
    - Description: The type of vertex

## upsertVertex

### About
Upserts a new vertex to the graph.

### Code
```
upsertVertex(vertexType, vertexId, attributes);
```
```
upsertVertex("Vertex_Type", "Vertex_ID", {attr: "sample_attr"}).then((data) => console.log(data));
```

### Parameters

- vertexType
    - Type: String
    - Description: Vertex type to upsert.
- vertexId
    - Type: Any
    - Description: ID of vertex to upsert.
- attributes
    - Type: JSON Object
    - Description: Map of attribute names to attribute values.
