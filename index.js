// MODULES
const Router = require('router')
const cors = require('cors')
const finalhandler = require('finalhandler')
const handlers = require('./lib/handlers')

// INIT
const router = Router()
router.use(cors())

// ROUTES
router.get('/api/content', handlers.content)
router.post('/api/content', handlers.content)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
