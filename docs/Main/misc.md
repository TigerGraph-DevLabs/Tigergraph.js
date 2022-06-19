# Other Functions

## echo

### About
Test the connection with echo() which will return "Hello GSQL"

### Code
```
conn.echo();
```
```
conn.echo().then((data) => console.log(data));
```

### Parameters

None

## getEndpoints

### About
Returns the endpoints of the graph

### Code
```
conn.getEndpoints(builtin, dynamic, static);
```
```
conn.getEndpoints(true, true, true).then((data) => console.log(data));
```

### Parameters

- builtin
    - Type: Boolean
    - Description: Checks for endpoints preinstalled in the TigerGraph system.
- dynamic
    - Type: Boolean
    - Description: Checks for endpoints generated when compiling GSQL queries.
- static
    - Type: Boolean
    - Description: Checks for user-installed endpoints.

## version

### About
Returns the version.

### Code
```
conn.getVersion();
```
```
conn.getVersion().then((data) => console.log(data));
```

### Parameters

None