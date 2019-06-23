const express = require('express');
const router =  express.Router();
const List   = require('../models/list');


// On creating a new list
router.post('/create-list', (req,res,next) => {

  // Create list using values in request
  const list = new List({
    item: req.body.item,
    children: req.body.children
  });


  // Save the list
  list.save()
    .then( savedList => {
      console.log(savedList);
      res.status(200).json({message: 'List created successfully', createdList: savedList});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: err});
    })


});



// Fetch all the lists created
router.get('/fetch-lists', (req,res,next) => {

  // Find all the lists documents in the collection
  List.find()
    .then(fetchedLists=> {
      res.status(200).json({message: 'Fetched lists successfully', fetchedLists: fetchedLists});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: err});
    })


})


// When user changes card position within a list
router.post('/update-list/:listID/', (req,res,next) => {

  List.updateOne({"_id": req.params.listID},
    {
    "children": req.body.children
    }
  )
    .then(updatedLists=> {
      res.status(200).json({message: 'Fetched lists successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: err});
    })

})


// When user creates a card within a list
router.post('/create-card/:listID/', (req,res,next) => {

  console.log('create card path');

  // Find list by _id and push the new card by _id
  List.update( {"_id": req.params.listID},

        {$push:
          {"children": {
            item : req.body.title,
            description : req.body.description,
            comments: req.body.comments,
          }
        }
  })
    .then (fetchedCard => {
      console.log(fetchedCard);
      res.status(200).json({message: 'Card added successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({message: err});
    })

});


// When user updates a card within a list
router.post('/update-card/:listID/:cardID', (req,res,next) => {

  // Find by list id and card id
  List.findOneAndUpdate(

    {"_id" : req.params.listID, "children._id": req.params.cardID},

    // Set the new values
    {
      "$set" : {
        "children.$.item" : req.body.title,
        "children.$.description" : req.body.description,
        "children.$.comments" : req.body.comments
      }
    },
    {new: true}
  )
    .then (fetchedCard => {
      console.log(fetchedCard);
      res.status(200).json({message: 'Card updated successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: err});
    })

})


// When user deletes a card within a list
router.delete('/delete-card/:listID/:cardID', (req,res,next) => {

  // Find list by _id and push the new card to schema
  List.update( {"_id": req.params.listID}, { $pull: {"children": {"_id" : req.params.cardID } } } )
  .then (fetchedCard => {
    console.log(fetchedCard);
    res.status(200).json({message: 'Card deleted successfully'});
  })
  .catch(err => {
    console.log(err);
    res.status(200).json({message: err});
  })
})


module.exports = router;
