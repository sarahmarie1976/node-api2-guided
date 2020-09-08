const express = require("express");
const Hubs = require("./hubs-model.js"); // moved this over from index.js
const router = express.Router();

// by the time this code runs. the url begins with /api/hubs
// we only need to define what comes after that

// change server. to router. 

router.get("/", (req, res) => {
    Hubs.find(req.query)  // this looks like a object, and you can read those key/values out of the object
    .then(hubs => {
        // wrapping query: req.query, data: hubs in an object
      res.status(200).json({query: req.query, data: hubs});  // changed code here
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });
  
  // handels requests to /api/hubs/:id 
  router.get("/:id", (req, res) => {
    Hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    });
  });
  
  router.post("/", (req, res) => {
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  });
  
  router.delete("/:id", (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
  });
  
  router.put("/:id", (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
  });

//  ************************************ NEW CODE **********************************

    // bring me the router with this id "/:id/messages" and then give me the messages
  router.get('/:id/messages', (req, res) => {

        // grabbing the id from the params
      const { id } = req.params;


        // call the database -- Hubs is the name of our library (kind of an axios but for the database)
        // findHubMessages function and we can pass id 
        // thats a call that is going to a database asynchronous call
      Hubs.findHubMessages(id)
           // it is going to return a promise ---> this library (Hubs)
           // then we should get back the messages 
      .then(messages => {
          res.status(200).json({ data: messages })
      })
            // promise can succeed or fail so aways have a catch to catch the failure/error
      .catch(err => {
          console.log(error.message);
          res.status(500).json({ errorMessage: 'we could not get the hubs data' })
      });
  });


  //    /api/2/messages

  router.post("/:id/messages", (req, res) => {
    const messageInfo = req.body;

    Hubs.addMessage(messageInfo)
       
     .then(message => {
        res.status(201).json({ data: message })
    })
    
    .catch(err => {
      console.log(error.message);
      res.status(500).json({ errorMessage: 'we could not add the message' })
  });
});

// add an endpoint that returns all the messages for a hub
//    /messages?hubid=1
//    /hubs/1/messages

// add an endpoint for adding new message to a hub


// const testMessage = {
//     "text": "message text",
//     "sender": "me",
//     "hubId": 1
// }


  // export default router; 
module.exports = router; // same as above*


//  https://github.com/luishrd?tab=repositiories 
//  https://github.com/LambdaSchool/web-guided-project-dom-2/issues