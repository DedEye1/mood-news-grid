import { type NewsItem } from '@classes/news-handler'
import Database from 'better-sqlite3'
import { SqliteError } from 'better-sqlite3'
import { log, logError } from '@classes/dev-log'

const db = new Database('news.db')

export function getCollumnsNames() {
  const newsQuery = db.prepare(`SELECT * FROM news`)
  return newsQuery.columns().map((column) => column.name)
}

export function saveNews(news: NewsItem[]) {
  const query = db.prepare(`INSERT INTO news (id, title, link, description, category, pubDate) VALUES (?, ?, ?, ?, ?, ?)`)
  news.map((news) => {
    try {
      query.run(news.id, news.title, news.link.toString(), news.description, news.category, news.pubDate.toISOString())
      log(`Saved news on id ${news.id}`)
    } catch (err) {
      if (err instanceof SqliteError) {
        logError(true, `Error saving news on id ${news.id}: ${err.message}`)
      }
    }
  })
}

export function getAllNews() {
  const query = db.prepare(`SELECT * FROM news`)
  return query.all() as NewsItem[]
}

export function getNewsById(id: number) {
  const query = db.prepare(`SELECT * FROM news WHERE id = ?`)
  return query.get(id) as NewsItem
}