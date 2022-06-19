# Edges Functions

## getEdges

### About
Retrieves edges of a certain type from a certain vertex from the graph

### Code
```
conn.getEdges(sourceVertexType, sourceVertexId, edgeType);
```
```
conn.getEdges("Doc", "Doc1", "LINKS_TO").then((data) => console.log(data));
```

### Parameters

- sourceVertexType
    - Type: String
    - Description: The type of the vertices the edges will be attached to.
- sourceVertexId
    - Type: Any
    - Description: The unique id of the vertex the edges must be attached to
- edgeType
    - Type: String
    - Description: The edge type desired

## upsertEdge

### About
Adds a new edge to your graph

### Code
```
conn.upsertEdge(sourceVertexType, source_vertex_id, edge_name, target_vertex_name, target_vertex_id, attributes)
```
```
conn.upsertEdge("Doc", "Doc1", "LINKS_TO", "Doc", "Doc2", {weight: 5.0}).then((data) => console.log(data));
```

### Parameters

- sourceVertexType
    - Type: String
    - Description: Type of source vertex.
- source_vertex_id
    - Type: Any
    - Description: ID of source vertex.
- edge_name
    - Type: String
    - Description: Type of edge to upsert.
- target_vertex_name
    - Type: String
    - Description: Type of target vertex.
- target_vertex_id
    - Type: Any
    - Description: ID of target vertex.
- attributes
    - Type: JSON Object
    - Description: Map of all the attributes of the edge.
