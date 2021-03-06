require('dotenv').config()
const axios = require('axios')
const { writeFileSync } = require('fs')
const tagsUrl = `${process.env.CONTENT_URL}/wp-json/wp/v2/tags`

function repackTags (prev, curr) {
  prev[curr.name] = curr.id
  return prev
}

axios.get(tagsUrl).then(result => {
  const tags = result.data.reduce(repackTags, {})
  writeFileSync('lib/data/tags-mapping.json', JSON.stringify(tags, null, 2))
  console.log('tags-mapping complete')
}).catch(console.error)
