var express = require('express'),
    categoriesRepo = require('../repo/categoriesRepository');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  categoriesRepo.getCategories(function(err, categories){
    if(err) {
      console.log(err.toString());
      res.json(err);
    } else {
      res.json(categories);
    }
  })

});

router.post('/', function(req, res, next){
  var category = {
    categoryId : req.body.id,
    categoryName : req.body.name,
    imageUrl: req.body.imageUrl
  };
  categoriesRepo.create(category, function(err, storedCategory){
    if(err) {
      res.json(err);
      return err;
    }
    res.json(storedCategory);
  })
})

module.exports = router;
