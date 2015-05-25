'use strict';

var mongoose    = require('mongoose'),
    Schema          = mongoose.Schema,
    ObjectId        = Schema.Types.ObjectId;

var categoryModel = function() {

    var Category = Schema({
        name        : { type: String, required: true, trim: true },
 //       subCategory : { type:ObjectId, ref:'categories'},
        imageUrl    : { type: String, trim : true}
    });
    Category.virtual('id').get(function() {
        return this._id.toString();
    });
    
    return mongoose.model('category', Category);

};

module.exports = new categoryModel();
