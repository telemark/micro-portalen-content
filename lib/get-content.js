'use strict'

const axios = require('axios')
const makeUnique = require('tfk-unique-array')
const NodeCache = require('node-cache')
const config = require('../config')
const myCache = new NodeCache({stdTTL: 3600})

module.exports = data => {
  const newsUrl = `${config.contentUrl}?channel=news&tags=${data.tags}`
  const adsUrl = `${config.contentUrl}?channel=ads&tags=${data.tags}`
  const newsKey = `news-${data.tags.replace(',', '.')}`
  const adsKey = `ads-${data.tags.replace(',', '.')}`

  return new Promise(async (resolve, reject) => {
    const cachedNews = myCache.get(newsKey)
    const cachedAds = myCache.get(adsKey)
    const flushAll = /flushAll/.test(data.tags)
    if (flushAll === true) {
      myCache.flushAll()
      console.log('Cache nuked')
      resolve('Cache nuked')
    } else if (cachedAds && cachedNews) {
      console.log(`${data.tags} - returns data from cache`)
      resolve({news: cachedNews, ads: cachedAds})
    } else {
      try {
        const [ads, news] = await Promise.all([axios(adsUrl), axios(newsUrl)])
        const newsResult = makeUnique(news.data.data || [])
        const adsResult = makeUnique(ads.data.data || [])
        myCache.set(newsKey, newsResult)
        myCache.set(adsKey, adsResult)
        console.log(`${data.tags} - refills cache`)
        resolve({news: newsResult, ads: adsResult})
      } catch (error) {
        console.error(error)
        reject(error)
      }
    }
  })
}
