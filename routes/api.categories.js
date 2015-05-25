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
    name : req.body.name,
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

router.get('/:id', function(req, res, next){
  categoriesRepo.getCategoryById(req.params.id, function(err, categories){
    if(err) {
      console.log(err.toString());
      res.json(500, err);
    } else {
          
      res.json(categories);
    }
  })
})

router.put('/', function(req, res, next){
  var category = {
    _id      : req.body._id,  
    name     : req.body.name,
    imageUrl : req.body.imageUrl
  };
  
    categoriesRepo.updateCategory(category, function(err, storedCategory){
    if(err) {
      res.json(err);
      return err;
    }
    res.json(storedCategory);
  })
})

// not able to test:: Need to fix
router.delete('/:id', function(req, res, next){
  categoriesRepo.deleteCategory(req.params.id, function(err, data){
    if(err) {
      console.log(err.toString());
      res.status(500).json(err);
    } else {
      var dataObj = JSON.parse(data);    
      var status = {status:dataObj.ok, count:dataObj.n};    
      res.status(200).json(status);
    }
  })
})



module.exports = router;
