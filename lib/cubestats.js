function CubeStats() {
  var _url,
      _api        = '1.0',
      _event      = 'event',
      _metric     = 'metric',
      _expression = 'get?expression=',
      _query,
      placeholder = '%s',
      filters     = [];
      params      = [];
      uri         = [];

  function stats() {};

  stats.url = function(_) {
    if(!arguments.length) return _url;
    _url = _;
    return stats;
  }

  stats.event = function() {
    uri = [_url, _api, _event, _expression];
    return stats;
  }

  stats.metric = function() {
    uri = [_url, _api, _metric, _expression];
    return stats;
  }

  stats.expression = function(_) {
    filters.push(compileFilter.apply(this,arguments));
    return stats;
  }

  stats.query = function() {
    _query = build(uri,'/');
    _query += build(filters, '.');
    if(params.length >= 1)
      _query += '&' + build(params, '&');
    return _query;
  }

  stats.limit = function(_) {
    params.push("limit=" + _);
    return stats;
  }

  stats.start = function(_) {
    params.push("start=" + _);
    return stats;
  }

  stats.stop = function(_) {
    params.push("stop=" + _);
    return stats;
  }

  stats.params = function(_) {
    params.push(_);
    return stats;
  }

  stats.execute = function(callback) {
    d3.json(stats.query(), callback);
  }
  stats.fetch = stats.execute;


  function compileFilter(_) {
    if(arguments.length <= 1) return _;

    var args = Array.prototype.slice.call(arguments),
        exp = args.shift();

    for(var i=0; i<args.length; i++) 
      exp = exp.replace(placeholder, args[ i]);

    return exp;
  }

  function build(arr, j) {
    return arr.join(j);
  }

  return stats;
}