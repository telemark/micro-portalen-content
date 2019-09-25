const getContent = require('./lib/get-content')
const logger = require('./lib/logger')
const tagMap = require('./lib/data/tags-mapping.json')
let cache = {}

function mapTags (roles) {
  const mapped = roles.map(role => tagMap[role])
  const filtered = mapped.filter(tag => tag !== undefined)
  return filtered
}

module.exports = async (request, response) => {
  const data = ['POST'].includes(request.method) ? await request.body : request.query
  let roles = []
  if (data.roles) {
    roles = Array.isArray(data.roles) ? data.roles : data.roles.split('|')
  }
  const tags = mapTags(roles)
  const flushAll = /flushAll/.test(data.roles)
  if (flushAll) {
    cache = {}
    logger('info', ['handlers', 'content', 'cache nuked'])
  }
  logger('info', ['handlers', 'content', 'tags', tags])
  let cached = cache[tags]
  if (!cached) {
    logger('info', ['handlers', 'content', 'no cache', 'looking up'])
    const result = await getContent({ tags: tags })
    cache[tags] = result
    cached = result
  } else {
    logger('info', ['handlers', 'content', 'cached'])
  }
  response.json(cached)
}
