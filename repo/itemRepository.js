var mongoose = require('mongoose'),
    categoryModel = require('../models/model.categories');

var itemsModel = require('../models/model.items');

var ItemsRepo = function () {
  getItems = function (callback) {
    itemsModel.find().select('_id name desc imageUrl categories').populate('categories').exec(function (err, categories){
      callback(err, categories);
    });
  }

  create = function(item, callback) {
      itemDb = new itemsModel();
      itemDb.name = item.name;
      itemDb.desc = item.desc;
      itemDb.imageUrl = item.imageUrl;
      if(item.categories !=null) {
        itemDb.categories.push(item.categories);
      }
      itemDb.save(function(err, storedItem) {
        if(err) { callback(err, null);}
        storedItem.populate('categories', function(err){
            callback(err, storedItem);
        });  
          
      })
  }

  getItemById = function(id, callback) {
    itemsModel.findById(id, '_id name desc imageUrl categories').populate('categories').exec(function (err, item){
      callback(err, item);
    })
  }

   
  deleteItem = function(id, callback) {
    itemsModel.remove( {_id: id}, function(err, result) {
        
        callback(err, result);
    });
  }
  
  updateItem = function(newItem, callback) {
    itemsModel.findById(newItem._id, function(err, itemFromDb) {
        if(err) {callback(err, null);}
        itemFromDb.name = newItem.name;
        itemFromDb.imageUrl = newItem.imageUrl;
        itemFromDb.desc = newItem.desc;
        itemFromDb.categories = newItem.categories;
        itemFromDb.save(callback);
        
    });
  }
  
  
  
  return {
    getItems        : getItems,
    create          : create,
    getItemById     : getItemById,
    updateItem      : updateItem,  
    deleteItem      : deleteItem  
  };

}();

module.exports = ItemsRepo;
