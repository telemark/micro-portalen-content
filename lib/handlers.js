'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { json, send } = require('micro')
const { parse } = require('url')
const getContent = require('./get-content')
const logger = require('./logger')

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
  const tags = roles.join(',')
  logger('info', ['handlers', 'content', 'tags', tags])
  const result = await getContent({tags: tags})
  send(response, 200, result)
}
