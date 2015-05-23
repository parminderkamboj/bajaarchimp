var should = require('should');
    categoryRoute = require('../routes/categories'),
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config');

describe('Category APIs', function(){
  var url = 'http://localhost:3000/api'
  var data = {
        _id : '',
        name: 'test data',
        imageUrl: 'test.png'
      };
  
  before(function(done){
    db.init(config.databaseConfig, false);
    done();
  })
  describe('categories', function(){
    

    
    it('Should insert category into db', function(done){

      
      request(url).post('/categories').send(data)
      .end(function(err, res){
        if(err) {throw error;}
        data._id = res.body._id;  
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        done();
      });
    });
      
    it('Should get list of categories', function(done){
      request(url).get('/categories')
        .end(function(err, res) {
          if(err) {

            throw err;
          }

          //  res.should.have.status(400);
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            
          done();
        });
    });  

    
    it('/categories/:id Should get id category by id', function(done){
      request(url).get('/categories/' + data._id)
        .end(function(err, res) {
          if(err) {
            throw err;
          }

          //  res.should.have.status(400);
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('imageUrl');
            res.body.name.should.be.eql(data.name);
            res.body.should.have.property('imageUrl');
            res.body.imageUrl.should.be.eql(data.imageUrl);

          done();
        });
    });  
    
      
    it('Should update category into db', function(done){

      data.name = 'test2';
      data.imageUrl = 'test2.png';    
      request(url).put('/categories').send(data)
      .end(function(err, res){
        if(err) {throw error;}
        data._id = res.body._id;  
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.name.should.be.eql(data.name);
        res.body.should.have.property('imageUrl');
        res.body.imageUrl.should.be.eql(data.imageUrl);  
        done();
      });
    });
      
    it('Delete /categories/:id Should delete category ' + data._id , function(done){
      request(url).delete('/categories/' + data._id)
        .end(function(err, res) {
          if(err) {
            throw err;
          }

//            res.should.have.status(200);
            res.body.should.have.property('status');
            res.body.status.should.be.eql(1);
            res.body.should.have.property('count');
            res.body.status.should.be.eql(1);

          done();
        });
    });    
      
  });

  after(function(done){
    db.close();
    done();
  });

})
