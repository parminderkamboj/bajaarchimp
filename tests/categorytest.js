var should = require('should');
    categoryRoute = require('../routes/categories.js'),
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config');

describe('Routing', function(){
  var url = 'http://localhost:3000/';
  before(function(done){
    //db.init(config.databaseConfig, false);
    //done();
  })
  describe('categories', function(){
    it('Should get list of categories', function(done){
      request(url).get('categories')
        .end(function(err, response) {
          if(err) throw err;
          response.should.have.status(200);
          done();
        })
    });
  });

})
