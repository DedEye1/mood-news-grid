import { getNewsRss } from '@modules/news-handler'
import { getNewsById, saveNews, saveNewsContent } from '@modules/db-handler'
import { getAllNews, getAllNewsContent } from '@modules/db-handler'
import { log } from '@modules/dev-log'
import { getNewsContentById } from '@modules/scraping-handler'

async function main() {
  const newsRss = await getNewsRss()
  saveNews(...newsRss)
  const allNews = getAllNews()
  console.log(allNews)
  const news = allNews[0]
  if (!news) {
    return
  }
  const newsContent = await getNewsContentById(news.id)
  if (!newsContent) {
    return
  }
  saveNewsContent(newsContent)
  const newsContentBd = await getNewsContentById(news.id)
  console.log(newsContentBd)
}

main()