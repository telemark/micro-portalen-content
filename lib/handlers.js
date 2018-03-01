const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { json, send } = require('micro')
const { parse } = require('url')
const getContent = require('./get-content')
const logger = require('./logger')
const tagMap = require('./data/tags-mapping.json')

function mapTags (roles) {
  console.log(tagMap)
  const mapped = roles.map(role => tagMap[role])
  console.log(mapped)
  const filtered = mapped.filter(tag => tag !== undefined)
  return filtered
}

module.exports.frontpage = (request, response) => {
  const readme = readFileSync('./README.md', 'utf-8')
  const html = marked(readme)
  logger('info', ['handlers', 'frontpage'])
  send(response, 200, html)
}

module.exports.content = async (request, response) => {
  const { query } = await parse(request.url, true)
  const data = ['POST'].includes(request.method) ? await json(request) : query
  let roles = []
  if (data.roles) {
    roles = Array.isArray(data.roles) ? data.roles : data.roles.split('|')
  }
  const tags = mapTags(roles)
  logger('info', ['handlers', 'content', 'tags', tags])
  const result = await getContent({tags: tags})
  send(response, 200, result)
}
