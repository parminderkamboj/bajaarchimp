'use strict';

var mongoose    = require('mongoose'),
    Schema          = mongoose.Schema,
    ObjectId        = Schema.Types.ObjectId;

var categoryModel = function() {

    var Category = Schema({
        name        : { type: String, required: true, trim: true },
        // subCategory         : categorySchema,
        imageUrl    : { type: String, trim : true}
    });
    Category.virtual('id').get(function() {
        return this._id.toString();
    });
    

    return mongoose.model('category', Category, 'categories');

};

module.exports = new categoryModel();
