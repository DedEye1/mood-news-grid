import { getNewsRss } from '@classes/news-handler'
import { saveNews } from '@classes/db-handler'
import { getAllNews } from '@classes/db-handler'
import { log } from '@classes/dev-log'

const news = await getNewsRss()
log('Logging news:', news)
log('#'.repeat(10))

saveNews(news)
log('Saved news to db')
log('#'.repeat(10))

const newsDb = getAllNews()
log('Logging all news from db:', newsDb)
log('#'.repeat(10))

log('Logging all news ids from db:', newsDb.map((news) => news.id))