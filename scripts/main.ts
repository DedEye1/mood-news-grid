// const url = 'https://api.firecrawl.dev/v2/scrape'
// const options = {
//   method: 'POST',
//   headers: {
//     Authorization: 'Bearer fc-85e6cda6fd974a87bcfb7a96617ac72e',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "url": "https://www.interfax.ru/moscow/1109145",
//     "onlyMainContent": true,
//     "includeTags": [
//       "article"
//     ],
//     "formats": [
//       "markdown"
//     ]
//   })
// }

// try {
//   const response = await fetch(url, options)
//   const data = (await response.json()).data.markdown
//   console.log(data)
// } catch (error) {
//   console.error(error)
// }

import { getNewsRss } from '@classes/news-handler'
import { saveNews } from '@classes/db-handler'
import { getAllNews } from '@classes/db-handler'

const news = await getNewsRss()
console.log('Logging news:', news)
console.log('#'.repeat(10))

saveNews(news)
console.log('Saved news to db')
console.log('#'.repeat(10))

console.log('Logging all news from db:', getAllNews())
console.log('#'.repeat(10))