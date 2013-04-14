cubestats
=========

A d3 plugin for querying a cube evaluator

#### Usage

```javascript
var stats, 
    cube_server = 'http://localhost:1081',
    the_page = "/goat/pain";

/* 
  Ask cube for one share event on the page /goat/pain that occured on an iOS device
*/
stats = CubeStats()
  .url(cube_server)
  .event('shares(platform,page)')
  .eq('platform','iOS')
  .eq('page', the_page)
  .limit(1);

/*
  #fetch will query 
  http://localhost:1081/1.0/event/get?expression=shares(platform,page).eq(platform,"iOS").eq(page,'goat/pain')&limit=1
*/
stats.fetch(function(error,data) {
  console.log(data);
});
```

#### API 

`url(path_to_cube_evaluator)`

##### Types

`event(cube_event)`

`metric(cube_metric)`

##### Filters

`eq(field, value)`

Show records where field is equal to value

`lt(field, int)`

Show records when field is less than int

`gt(field, int)`

Show records when field is greater than int

`le(field, int)`

Show records when field is less than or equal to int

`ge(field, int)`

Show records when field is greater than or equal to int

`re(field, regExString)`

Show records when field matches regExString. regExString should not include the `//` literals, only the expressions
contained inside. 

`includes(field, array)`

Show records when field equals any element of array

###### Parameters

`limit(int)`

Only return int records

`start(date)`

`stop(date)`

###### Actions

`fetch(callback)`

Fetch compiles your expressions and queries the cube server. `callback` accepts error and data as arguments. 

```javascript
stats.fetch(function(error, data) {
    console.log(data);
})
```
