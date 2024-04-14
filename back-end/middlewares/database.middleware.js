function database(pool) {
    return function(req, res, next) {
      req.db = pool;
      next();
    };
  }
  
  module.exports = database;
  