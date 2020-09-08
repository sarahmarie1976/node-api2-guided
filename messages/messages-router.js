// alternative example using /messages

const express = require("express");

const Hubs= require("../hubs/hubs-model.js"); // moved from hubs-router.js

const router = express.Router();

// POST to /api/
router.post("/", (req, res) => {
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



module.exports = router; 