var should = require('should');
    categoryRepo = require('../repo/categoriesRepository'),
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config'),
    mongoose = require('mongoose');

describe('Category APIs', function(){
  var url = 'http://localhost:3000'
  before(function(done){
    db.init(config.databaseConfig, false);
    done();
  });
  var catId = new mongoose.Schema.ObjectId();   
  var category = {id: catId, name:'test', imageUrl:'test.png'}; 
  describe('categoryRep.create create users', function(){
    it('should get create test users', function(done){
          
      categoryRepo.create(category, function(err, savedCategory){
        if (err) throw err;
        savedCategory.should.have.property('_id');
        savedCategory.name.should.be.equal(category.name);  
        category.id = savedCategory._id;  
        done();
      });
      
          
    });
  })
  
  describe('category repo get users', function(){
    it('should get all users', function(done){
      categoryRepo.getCategories(function(err, categories){
        if (err) throw err;
        categories[0].should.have.property('_id');
        console.log(categories);  
        done();
      });
      
          
    });
  })
  
  describe('category repo getUsersById', function(){
    it('should get one user', function(done){
      categoryRepo.getCategoryById(category.id.toString(), function(err, categoryFromDb){
        if (err) throw err;
        categoryFromDb.should.have.property('_id');
        categoryFromDb.name.should.be.eql(category.name);
        done();
      });
      
          
    });
  })
  
  describe('category repo delete users', function(){
    it('should get all users', function(done){
      categoryRepo.deleteCategory(category.id, function(err){
        if (err) throw err;
        done();
      });
    });
  })

  after(function(done){
    db.close();
    done();
  });
});
