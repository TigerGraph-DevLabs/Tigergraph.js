# Other Functions

## echo

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

## statistic

### About
Echo finds the approximate time in between launches.

### Code
```
conn.echo(callback);
```
```
conn.echo((data) => {
    console.log(data);
});
```

### Parameters
- Callback
  - Function of what to do next


## getEndpoints
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

## version
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
