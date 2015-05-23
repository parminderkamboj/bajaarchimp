var mongoose = require('mongoose'),
    categoryModel = require('../models/model.categories');

var CategoriesRepo = function () {
  getCategories = function (callback) {
    categoryModel.find().select('_id name imageUrl').exec(function (err, categories){
      callback(err, categories);
    });
  }

  create = function(category, callback) {
    categoryDb = new categoryModel();
      categoryDb.name = category.name;
      categoryDb.imageUrl = category.imageUrl;
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
    categoryModel.remove( {_id: id}, function(err, result) {
        
        callback(err, result);
    });
  }
  
  updateCategory = function(newCategory, callback) {
    categoryModel.findById(newCategory._id, function(err, catFromDb) {
        if(err) {callback(err, null);}
        catFromDb.name = newCategory.name;
        catFromDb.imageUrl = newCategory.imageUrl;
        catFromDb.save(callback);
        
    });
  }
  
  
  
  return {
    getCategories   : getCategories,
    create          : create,
    getCategoryById : getCategoryById,
    updateCategory  : updateCategory,  
    deleteCategory  : deleteCategory  
  };

}();

module.exports = CategoriesRepo;
