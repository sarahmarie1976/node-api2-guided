const express = require("express");

const hubsRouter = require("./hubs/hubs-router.js");  // added
const messagesRouter = require("./messages/messages-router.js"); // added

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

/*
   - instead of having all the endpoints in index.js
      we are going to tell the server when ever someone goes to '/api/hubs'
      I want you to use the hubsRouter 
   - make sure you import it above like this:
      const hubsRouter = require('./hubs.hubs-router.js');
*/
server.use('/api/hubs', hubsRouter);  // added 
server.use("/api/messages", messagesRouter);  // added 

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub
const PORT = 8000;
server.listen(PORT, () => {
  console.log('\n*** Server Running on http://localhost:8000 ***\n');
});
