'use strict';

var mongoose    = require('mongoose'),
    Schema          = mongoose.Schema,
    ObjectId        = Schema.Types.ObjectId;

var categoryModel = function() {

    var Category = Schema({
        categoryId          : { type: String, required: true },
        categoryName        : { type: String, required: true },
        // subCategory         : categorySchema,
        imageUrl            : String
    });

    return mongoose.model('category', Category, 'categories');

};

module.exports = new categoryModel();
