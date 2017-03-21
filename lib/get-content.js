'use strict'

const axios = require('axios')
const config = require('../config')

module.exports = data => {
  const newsUrl = `${config.contentUrl}?channel=news&tags=${data.tags}`
  const adsUrl = `${config.contentUrl}?channel=ads&tags=${data.tags}`
  return new Promise(async (resolve, reject) => {
    try {
      const {ads, news} = await Promise.all([axios(adsUrl), axios(newsUrl)])
      resolve({news: news.data.data || [], ads: ads.data.data || []})
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
