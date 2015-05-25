'use strict';

var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    ObjectId        = Schema.Types.ObjectId,
    CategoryModel   = require('./model.categories');

var itemModel = function() {

    
    var Item = Schema({
        name        : { type: String, required: true, trim: true },
        desc        : { type: String, trim:true }, 
        imageUrl    : { type: String, trim : true},
        categories  : [{ type: ObjectId, ref:'categories'}]
     //   categories  : [CategoryModel]
    });
    Item.virtual('id').get(function() {
        return this._id.toString();
    });
    
    
    // next line looks redundent but is needed for populate: Looks like a hack to me. 
    mongoose.model('categories', CategoryModel.schema);
    return mongoose.model('items', Item);

};

module.exports = new itemModel();
