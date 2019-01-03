const axios = require('axios')
const makeUnique = require('tfk-unique-array')
const NodeCache = require('node-cache')
const config = require('../config')
const logger = require('./logger')
const myCache = new NodeCache({ stdTTL: 3600 })

async function getNews (tag) {
  const url = `${config.contentUrl}/wp-json/wp/v2/posts?categories=3&tags=${tag}&nocache=${new Date().getTime()}`
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    logger('error', ['get-content', 'getNews', 'url', url, error])
    return []
  }
}

async function getSharedNews () {
  const url = `${config.sharedContentUrl}/wp-json/wp/v2/posts?categories=30&nocache=${new Date().getTime()}`
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    logger('error', ['get-content', 'getSharedNews', 'url', url, error])
    return []
  }
}

function unwrapResults (prev, curr) {
  curr.forEach(item => {
    prev.push(item)
  })
  return prev
}

function repackNews (item) {
  return Object.assign({}, {
    date: item.date,
    title: item.title.rendered,
    summary: item.excerpt.rendered,
    url: item.link
  })
}

function dateSort (b, a) {
  if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
    return -1
  } else if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
    return 1
  } else {
    return 0
  }
}

module.exports = data => {
  // const adsUrl = `${config.contentUrl}?channel=ads&tags=${data.tags}`
  const newsKey = `news-${data.tags.join('.')}`
  const adsKey = `ads-${data.tags.join('.')}`

  return new Promise(async (resolve, reject) => {
    const cachedNews = myCache.get(newsKey)
    const cachedAds = myCache.get(adsKey)
    const flushAll = /flushAll/.test(data.tags)
    if (flushAll === true) {
      myCache.flushAll()
      logger('info', 'get-content', 'Cache nuked')
      resolve('Cache nuked')
    } else if (cachedAds && cachedNews) {
      logger('info', 'get-content', 'tags', data.tags, 'cached', true)
      resolve({ news: cachedNews, ads: cachedAds })
    } else {
      try {
        let newsJobs = data.tags.map(getNews)
        newsJobs.push(getSharedNews())
        const AllNews = await Promise.all(newsJobs)
        const news = AllNews.reduce(unwrapResults, [])
        const uniqeNews = makeUnique(news || [])
        const newsResult = uniqeNews.map(repackNews)
        newsResult.sort(dateSort)
        // const adsResult = makeUnique(ads.data.data || [])
        const adsResult = []
        myCache.set(newsKey, newsResult)
        myCache.set(adsKey, adsResult)
        logger('info', 'get-content', 'tags', data.tags, 'cached', false)
        logger('info', 'get-content', 'tags', data.tags, 'news', newsResult.length, 'ads', adsResult.length)
        resolve({ news: newsResult, ads: adsResult })
      } catch (error) {
        logger('error', 'get-content', 'tags', error)
        reject(error)
      }
    }
  })
}
