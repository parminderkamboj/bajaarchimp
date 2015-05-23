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
  var category = {_id: '', name:'test', imageUrl:'test.png'}; 
  describe('categoryRep.create find update delete categories', function(){
    it('should create categories', function(done){
          
      categoryRepo.create(category, function(err, savedCategory){
        if (err) throw err;
        savedCategory.should.have.property('_id');
        savedCategory.name.should.be.equal(category.name);  
        category._id = savedCategory._id.toString();  
        done();
      });
      
          
    });
  })
  
  describe('category repo get categories', function(){
    it('should get all categories', function(done){
      categoryRepo.getCategories(function(err, categories){
        if (err) throw err;
        categories[0].should.have.property('_id');
        done();
      });
      
          
    });
  })
  
  
  
  describe('category repo getcategoriesById', function(){
    it('should get one user', function(done){
      categoryRepo.getCategoryById(category._id, function(err, categoryFromDb){
        if (err) throw err;
        categoryFromDb.should.have.property('_id');
        categoryFromDb.name.should.be.eql(category.name);
        done();
      });
      
          
    });
  })

  describe('category repo updateCategory', function(){
    it('should update one category', function(done){
      category.name = "test2";
      category.imageUrl = "test2.png";    
      categoryRepo.updateCategory(category, function(err, categoryFromDb){
        if (err) throw err;
        console.log("in update cat" + categoryFromDb.name + ' ' + categoryFromDb.imageUrl);
        categoryFromDb.should.have.property('_id');
        categoryFromDb.name.should.be.eql(category.name);
        categoryFromDb.imageUrl.should.be.eql(category.imageUrl);
        done();
      });
      
          
    });
  })
  
  describe('category repo delete categories', function(){
    it('should get categories', function(done){
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
