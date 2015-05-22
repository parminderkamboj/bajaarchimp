var should = require('should');
    categoryRoute = require('../routes/categories'),
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config');

describe('Category APIs', function(){
  var url = 'http://localhost:3000/api'
  before(function(done){
    db.init(config.databaseConfig, false);
    done();
  })
  describe('categories', function(){
    


    it('Should insert category into db', function(done){

      var data = {
        name: 'Diary Products',
        imageUrl: 'test.png'
      };
      request(url).post('/categories').send(data)
      .end(function(err, res){
        if(err) {throw error;}

        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        done();
      });
    });
      
    it('Should get list of categories', function(done){
      request(url).get('/categories')
        .end(function(err, res) {
          if(err) {

            throw err;}

          //  res.should.have.status(400);
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('imageUrl');

          done();
        });
    });  
  });

  after(function(done){
    db.close();
    done();
  });

})
