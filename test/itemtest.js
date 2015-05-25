var should = require('should');
    categoryRoute = require('../routes/api.items'),
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config');

describe('Items APIs', function(){
  var url = 'http://localhost:3000/api';
  var categoryData = {
        _id  : '',
        name : 'test category',
        imageUrl: 'testcat.png',
  };
  var itemData = {
        _id  : '',
        name : 'test item',
        desc : 'test item desc',
        imageUrl: 'testitem.png',
        categories:[]
      };
      
  
  before(function(done){
   // db.init(config.databaseConfig, false);
    request(url).post('/categories').send(categoryData)
      .end(function(err, res){
        if(err) {throw err;}
        categoryData._id = res.body._id;  
        itemData.categories.push(categoryData._id);
        done();
      });
    });  

describe('items', function(){
    

    
    it('Should insert item into db', function(done){

      
      request(url).post('/items').send(itemData)
      .end(function(err, res){
        if(err) {throw err;}
        itemData._id = res.body._id;  
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        done();
      });
    });
      
    it('Should get list of items', function(done){
      request(url).get('/items')
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

    
    it('/items/:id Should get id item by id', function(done){
      request(url).get('/items/' + itemData._id)
        .end(function(err, res) {
          if(err) {
            throw err;
          }

          //  res.should.have.status(400);
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('imageUrl');
            res.body.name.should.be.eql(itemData.name);
            res.body.should.have.property('imageUrl');
            res.body.imageUrl.should.be.eql(itemData.imageUrl);

          done();
        });
    });  
    
      
    it('Should update item into db', function(done){

      itemData.name = 'test2';
      itemData.imageUrl = 'test2.png';    
      request(url).put('/items').send(itemData)
      .end(function(err, res){
        if(err) {
            console.log(err.toString());
            throw err;}
        itemData._id = res.body._id;  
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.name.should.be.eql(itemData.name);
        res.body.should.have.property('imageUrl');
        res.body.imageUrl.should.be.eql(itemData.imageUrl);  
        done();
      });
    });
      
    it('Delete /categories/:id Should delete item ' + itemData._id , function(done){
      request(url).delete('/items/' + itemData._id)
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
    request(url).delete('/categories/' + categoryData._id)
        .end(function(err, res) {
          if(err) {
            throw err;
          }
//          db.close();
          done();
        });  
  });

});
