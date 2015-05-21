var should = require('should');
    categoryRepo = require('../repo/categoriesRepository'),
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config');

describe('Category APIs', function(){
  var url = 'http://localhost:3000'
  before(function(done){
    db.init(config.databaseConfig, false);
    done();
  });

  describe('category repo get users', function(){
    it('should get all users', function(done){
      categoryRepo.getCategories(function(err, categories){
        if (err) throw err;
        categories[0].should.have.property('_id');
        done();
      });
    });
  })

  after(function(done){
    db.close();
    done();
  });
});
