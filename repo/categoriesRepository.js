var mongoose = require('mongoose'),
    categoryModel = require('../models/model.categories');

var modelCategories = function () {
  getCategories = function (callback) {
    categoryModel.find(function (err, categories){
      callback(err, categories);
    });
  }

  create = function(category, callback) {
    categoryDb = new categoryModel(category);
    categoryDb.save(function(err, storedCategory) {
      callback(err, storedCategory);
    })
  }

  getCategoryById = function(category_id, callback) {
    categoryModel.findOne(function (err, category){
      callback(err, category);
    })
  }

  return {
    getCategories : getCategories,
    create : create,
    getCategoryById : getCategoryById
  };

}();

module.exports = modelCategories;
