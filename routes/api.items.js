var express = require('express'),
    itemRepo = require('../repo/itemRepository');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  itemRepo.getItems(function(err, items){
    if(err) {
      console.log(err.toString());
      res.json(err);
    } else {
      res.json(items);
    }
  })

});

router.post('/', function(req, res, next){
  var item = {
    name : req.body.name,
    desc : req.body.desc,  
    imageUrl: req.body.imageUrl,
    categories: req.body.categories
  };
  
    itemRepo.create(item, function(err, storedItem){
    if(err) {
      res.json(err);
      return err;
    }
    res.json(storedItem);
  })
})

router.get('/:id', function(req, res, next){
  itemRepo.getItemById(req.params.id, function(err, item){
    if(err) {
      console.log(err.toString());
      res.json(500, err);
    } else {
          
      res.json(item);
    }
  })
})

router.put('/', function(req, res, next){
    

  var item = {
    _id  : req.body._id,  
    name : req.body.name,
    desc : req.body.desc,  
    imageUrl: req.body.imageUrl,
    categories: req.body.categories
  };
  
    itemRepo.updateItem(item, function(err, storedItem){
    if(err) {
      console.log(err.toString());
      res.json(err);
        
      return err;
    }
    res.json(storedItem);
  })
})

router.delete('/:id', function(req, res, next){
  itemRepo.deleteItem(req.params.id, function(err, data){
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
