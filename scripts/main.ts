import { getNewsRss } from '@modules/news-handler'
import { getNewsById, saveNews, saveNewsContent } from '@modules/db-handler'
import { getAllNews, getAllNewsContent } from '@modules/db-handler'
import { getNewsContentById } from '@modules/scraping-handler'
import { randomInt } from 'node:crypto'
import { getNewsContentInMood } from '@modules/mood-changer'

async function main() {
  const newsRss = await getNewsRss()
  saveNews(...newsRss)
  const allNews = getAllNews()
  const rand = randomInt(0, allNews.length)
  const news = allNews[rand]
  if (!news) {
    return
  }
  const newsContent = await getNewsContentById(news.id)
  if (!newsContent) {
    return
  }
  saveNewsContent(newsContent)
  const newsContentBd = await getNewsContentById(news.id)

  if (!newsContentBd) {
    return
  }
  const contentPositive = await getNewsContentInMood(newsContentBd, 'positive')
  const contentNegative = await getNewsContentInMood(newsContentBd, 'negative')
  const contentIronic = await getNewsContentInMood(newsContentBd, 'ironic')
  if (contentPositive && contentNegative && contentIronic)
    saveNewsContent(contentPositive, contentNegative, contentIronic)
  console.log(getAllNewsContent())
}

main()