var should = require('should');
    itemRepo = require('../repo/itemRepository'),
    categoryRepo = require('../repo/categoriesRepository'),    
    request = require('supertest'),
    assert  = require('assert'),
    db = require('../database'),
    config   = require('../config'),
    mongoose = require('mongoose');

describe('Items APIs', function(){
  before(function(done){
    db.init(config.databaseConfig, false);
    done();
  });
  var category = { _id : '', name : 'test', imageUrl : 'test.png'};      
  var item = {_id: '', name:'test', desc : 'test', imageUrl:'test.png', categories:[]}; 
  describe('itemRep.create find update delete categories', function(){
    it('should create items', function(done){
          
    categoryRepo.create(category, function(err, savedCategory){
        if (err) throw err;
        item.categories.push(savedCategory._id);  
        itemRepo.create(item, function(err, savedItem){
            if(err) throw err;
            savedItem.should.have.property('_id');
            savedItem.name.should.be.eql(item.name);
            savedItem.desc.should.be.eql(item.desc);
            item._id = savedItem._id;
            done();
        });

      });
      
          
    });
  })
  
  describe('item repo get items', function(){
    it('should get all items', function(done){
      itemRepo.getItems(function(err, items){
        if (err) throw err;
        items[0].should.have.property('_id');
        items[0].categories[0].should.have.property('_id');
  
        done();
      });
      
          
    });
  })
  
  
  
  describe('item repo getItemsById', function(){
    it('should get one Item', function(done){
      itemRepo.getItemById(item._id, function(err, itemFromDb){
        if (err) throw err;
        itemFromDb.should.have.property('_id');
        itemFromDb.name.should.be.eql(item.name);        
        itemFromDb.desc.should.be.eql(item.desc);
        itemFromDb.categories[0].name.should.be.eql(category.name);  
        done();
      });
      
          
    });
  })

  describe('item repo updateItem', function(){
    it('should update one item', function(done){
      item.name = "test2";
      item.imageUrl = "test2.png";    
      item.categories[0].name = 'test2';
        
      itemRepo.updateItem(item, function(err, itemFromDb){
        if (err) throw err;
        itemFromDb.should.have.property('_id');
        itemFromDb.name.should.be.eql(item.name);
        itemFromDb.imageUrl.should.be.eql(item.imageUrl);
        itemFromDb.categories[0].name.should.be.eql('test2');  
        done();
      });
      
          
    });
  })
  
  describe('item repo delete items', function(){
    it('should delete item', function(done){
      itemRepo.deleteItem(item._id, function(err){
        if (err) throw err;
        itemRepo.getItemById(item._id, function(err, itemFromDb) {
            should.not.exist(itemFromDb);
            done();
        });  
      });
    });
  })

  after(function(done){
    db.close();
    done();
  });
});
