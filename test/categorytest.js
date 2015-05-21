var should = require('should');
    categoryRoute = require('../routes/categories.js'),
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config');

describe('Category APIs', function(){
  var url = 'http://localhost:3000'
  before(function(done){
    db.init(config.databaseConfig, false);
    done();
  })
  describe('categories', function(){
    it('Should get list of categories', function(done){
      request(url).get('/categories')
        .end(function(err, res) {
          if(err) {

            throw err;}

          //  res.should.have.status(400);
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('categoryId');
            res.body[0].categoryId.should.equal('1');
            res.body[0].should.have.property('categoryName');
            res.body[0].categoryName.should.equal('Alcohal');
          done();
        });
    });


    it('Should insert category into db', function(done){

      var data = {
        id:'2',
        name: 'Diary Products',
        imageUrl: 'test.png'
      };
      request(url).post('/categories').send(data)
      .end(function(err, res){
        if(err) {throw error;}

        res.body.should.have.property('_id');
        res.body.should.have.property('categoryId');
        res.body.categoryId.should.equal('2');
        res.body.should.have.property('categoryName');
        res.body.categoryName.should.equal('Diary Products');
        done();
      });
    });
  });



})
