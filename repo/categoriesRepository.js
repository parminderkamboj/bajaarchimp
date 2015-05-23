var mongoose = require('mongoose'),
    categoryModel = require('../models/model.categories');

var CategoriesRepo = function () {
  getCategories = function (callback) {
    categoryModel.find().select('_id name imageUrl').exec(function (err, categories){
      callback(err, categories);
    });
  }

  create = function(category, callback) {
    categoryDb = new categoryModel(category);
    categoryDb.save(function(err, storedCategory) {
      callback(err, storedCategory);
    })
  }

  getCategoryById = function(id, callback) {
    categoryModel.findById(id, '_id name imageUrl', function (err, category){
      callback(err, category);
    })
  }

   
  deleteCategory = function(id, callback) {
    categoryModel.remove( {_id: id}, function(err, count) {
        if(err) {
            console.log('in delete:' + err);
            callback(err, 0);
            
        }
        callback(err, count);
    });
  }
  
  return {
    getCategories   : getCategories,
    create          : create,
    getCategoryById : getCategoryById,
    deleteCategory  : deleteCategory  
  };

}();

module.exports = CategoriesRepo;
