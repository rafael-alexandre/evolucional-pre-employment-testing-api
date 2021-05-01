const jsonServer  = require('json-server')
const server      = jsonServer.create()
const router      = jsonServer.router(require('./db.js')())
const middlewares = jsonServer.defaults()
const _           = require('lodash');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

/**
 * Checks whether the id of the new data already exists in the DB
 * @param {*} db - DB object
 * @param {String} collection - Name of the array / collection in the DB / JSON file
 * @param {*} data - New record
 */
function insert(db, collection, data) {
  const table = db.get(collection)
  if (_.isEmpty(table.find(data).value())) {
    const lastItem = table.value()[table.value().length - 1]

    table.push({
      id: !_.isEmpty(lastItem) ? lastItem.id + 1 : 1,
      ...data,
    }).write()
  }
}

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const db = router.db; // Assign the lowdb instance

    if (Array.isArray(req.body)) {
      req.body.forEach(element => {
        insert(db, 'students', element) // Add a post
      });
    } else {
      insert(db, 'students', req.body) // Add a post
    }

    res.sendStatus(200)
  } else {
    next() // Continue to JSON Server router
  }
})

// Use default router
server.use(router)

server.listen(8000, function() {
  console.log('JSON Server is running')
})
