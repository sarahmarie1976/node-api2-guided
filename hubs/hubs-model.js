const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);


// we are exporting an object that has this find function
module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findHubMessages,
  findMessageById,
  addMessage,
};

function find(query) {
  const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('hubs')  // I want to see data on the hubs
    .orderBy(sortby, sortdir)  // using a library organizing sortby and sortdir
    .limit(limit)  // how we tell the db 
    .offset(offset);  // how many records I want to skip

  return rows;
}

function findById(id) {
  return db('hubs')
    .where({ id })
    .first();
}

async function add(hub) {
  const [id] = await db('hubs').insert(hub);

  return findById(id);
}

function remove(id) {
  return db('hubs')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('hubs')
    .where({ id })
    .update(changes, '*');
}

function findHubMessages(hubId) {
  return db('messages as m')
    .join('hubs as h', 'm.hub_id', 'h.id')
    .select('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as hub')
    .where({ hub_id: hubId });
}

// You Do
function findMessageById(id) {
  return db('messages')
    .where({ id })
    .first();
}

async function addMessage(message) {
  const [id] = await db('messages').insert(message);

  return findMessageById(id);
}
