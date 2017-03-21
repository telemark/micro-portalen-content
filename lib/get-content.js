'use strict'

const axios = require('axios')
const makeUnique = require('tfk-unique-array')
const config = require('../config')

module.exports = data => {
  const newsUrl = `${config.contentUrl}?channel=news&tags=${data.tags}`
  const adsUrl = `${config.contentUrl}?channel=ads&tags=${data.tags}`
  return new Promise(async (resolve, reject) => {
    try {
      const [ads, news] = await Promise.all([axios(adsUrl), axios(newsUrl)])
      resolve({news: makeUnique(news.data.data || []), ads: makeUnique(ads.data.data || [])})
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
