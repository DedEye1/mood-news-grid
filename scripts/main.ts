import { getNewsRss } from '@modules/news-handler'
import { getNewsByIdDb, saveNewsDb, saveNewsContentDb } from '@modules/db-handler'
import { getAllNewsDb, getAllNewsContentDb } from '@modules/db-handler'
import { getNewsContentById } from '@modules/scraping-handler'
import { randomInt } from 'node:crypto'
import { getNewsContentInMood } from '@modules/mood-changer'

async function main() {
  const news = await getNewsContentById(1109503)
  console.log(news)
}

main()