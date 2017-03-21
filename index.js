'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { json, send } = require('micro')
const { parse } = require('url')
const getContent = require('./lib/get-content')

module.exports = async (request, response) => {
  const { query } = await parse(request.url, true)
  const data = ['POST'].includes(request.method) ? await json(request) : query
  if (Object.keys(data).length > 0) {
    let roles = []
    if (data.roles) {
      roles = Array.isArray(data.roles) ? data.roles : data.roles.split('|')
    }
    const result = await getContent({tags: roles.join(',')})
    response.setHeader('Access-Control-Allow-Origin', '*')
    send(response, 200, result)
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
