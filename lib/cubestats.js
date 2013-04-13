function CubeStats() {
  var _url,
      _query,
      _api        = '1.0',
      _event      = 'event',
      _metric     = 'metric',
      _expression = 'get?expression=',
      placeholder = '%s',
      filters     = [],
      params      = [],
      uri         = [],
      PREPEND     = true;

  function stats() {}

  stats.url = function(_) {
    if(!arguments.length) return _url;
    _url = _;
    return stats;
  };

  stats.event = function(_) {
    if(!arguments.length) return console.warn("You must specify an event.");
    uri = [_url, _api, _event, _expression + _];
    return stats;
  };

  stats.metric = function() {
    uri = [_url, _api, _metric, _expression];
    return stats;
  };

  stats.expression = function(_) {
    filters.push(compileFilter.apply(this,arguments));
    return stats;
  };
  stats.filter = stats.expression;

  stats.query = function() {
    _query = build(uri,'/');
    _query += build(filters, '.', PREPEND);
    if(params.length >= 1)
      _query += build(params, '&', PREPEND);
    return _query;
  };

  stats.limit = function(_) {
    params.push("limit=" + _);
    return stats;
  };

  stats.start = function(_) {
    params.push("start=" + _);
    return stats;
  };

  stats.stop = function(_) {
    params.push("stop=" + _);
    return stats;
  };

  stats.params = function(_) {
    params.push(_);
    return stats;
  };

  stats.eq = function(k,v) {
    stats.expression(_e('eq', v),k,v);
    return stats;
  };

  stats.gt = function(k,v) {
    stats.expression(_e('gt', v),k,v);
    return stats;
  };

  stats.lt = function(k,v) {
    stats.expression(_e('lt', v),k,v);
    return stats;
  };

  stats.le = function(k,v) {
    stats.expression(_e('le', v),k,v);
    return stats;
  };

  stats.ge = function(k,v) {
    stats.expression(_e('le', v),k,v);
    return stats;
  };

  stats.re = function(k,v) {
    stats.expression(_e('re', v),k,v);
    return stats;
  };

  stats.includes = function(k,v) {
    stats.expression('in(%s,[%s])', k, v.join(','));
    return stats;
  };

  stats.execute = function(callback) {
    d3.json(stats.query(), callback);
  };
  stats.fetch = stats.execute;

  function _e(type,v) {
    var safe_exp = (typeof v === "number" || typeof v === "boolean") ? "%s" : "'%s'";
    return type + "(%s," + safe_exp + ")";
  }

  function compileFilter(_) {
    if(arguments.length <= 1) return _;

    var args = Array.prototype.slice.call(arguments),
        exp = args.shift();

    for(var i=0; i<args.length; i++) 
      exp = exp.replace(placeholder, args[ i]);

    return exp;
  }

  function build(arr, j, prepend) {
    if(!arr.length) return '';
    pj = prepend ?  j : '';
    return pj + arr.join(j);
  }

  function dataErrorCallback(func, extra) {
    return function() {

      return func.apply(this, arguments);
    };
  }

  return stats;
}
