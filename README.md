cubestats
=========

A d3 plugin for querying a cube evaluator

#### Usage

```javascript
var stats, 
    the_page = "/goat/pain";

/* 
  Ask cube for one share event on the page /goat/pain that occured on an iOS device
*/
stats = CubeStats()
  .url('http://localhost:1081')
  .event()
  .expression('shares(platform,page).eq(platform,"iOS")')
  .expression("eq(page,'%s')", the_page)
  .limit(1);

/*
  #fetch will query 
  http://localhost:1081/1.0/event/get?expression=shares(platform,page).eq(platform,"iOS").eq(page,'goat/pain')&limit=1
*/
stats.fetch(function(error,data) {
  if(error) return console.warn(error);
  console.log(data);
});
```
