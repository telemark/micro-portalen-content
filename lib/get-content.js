const axios = require('axios')
const makeUnique = require('tfk-unique-array')
const logger = require('./logger')

async function getNews (tag) {
  const url = `${process.env.CONTENT_URL}/wp-json/wp/v2/posts?categories=3&tags=${tag}&nocache=${new Date().getTime()}`
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    logger('error', ['get-content', 'getNews', 'url', url, error])
    return []
  }
}

async function getSharedNews () {
  const url = `${process.env.SHARED_CONTENT_URL}/wp-json/wp/v2/posts?categories=30&nocache=${new Date().getTime()}`
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

module.exports = async data => {
  try {
    const newsJobs = data.tags.map(getNews)
    newsJobs.push(getSharedNews())
    const AllNews = await Promise.all(newsJobs)
    const news = AllNews.reduce(unwrapResults, [])
    const uniqeNews = makeUnique(news || [])
    const newsResult = uniqeNews.map(repackNews)
    newsResult.sort(dateSort)
    // const adsResult = makeUnique(ads.data.data || [])
    const adsResult = []
    logger('info', 'get-content', 'tags', data.tags, 'news', newsResult.length, 'ads', adsResult.length)
    return { news: newsResult, ads: adsResult }
  } catch (error) {
    logger('error', 'get-content', 'tags', error)
    throw error
  }
}
