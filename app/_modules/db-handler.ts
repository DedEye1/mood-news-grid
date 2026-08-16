import { type NewsItem } from '@classes/news'
import Database from 'better-sqlite3'
import { SqliteError } from 'better-sqlite3'
import { log, logError } from '@modules/dev-log'
import { NewsContent, type Mood } from '@classes/news-content'

const db = new Database('news.db')

export function getCollumnsNamesDb() {
  const newsQuery = db.prepare(`SELECT * FROM news`)
  return newsQuery.columns().map((column) => column.name)
}

export function saveNewsDb(...news: NewsItem[]) {
  const query = db.prepare(`INSERT INTO news (id, title, link, description, category, pubDate) VALUES (?, ?, ?, ?, ?, ?)`)
  news.map((news) => {
    try {
      query.run(news.id, news.title, news.link.toString(), news.description, news.category, news.pubDate.toISOString())
      log(`Saved news on id ${news.id}`)
    } catch (err) {
      if (err instanceof SqliteError) {
        logError(true, `Error saving news on id ${news.id}: ${err.message}`)
      } else {
        logError(true, `Error saving news on id ${news.id}: ${err}`)
      }
    }
  })
}

export function saveNewsContentDb(...newsContent: NewsContent[]) {
  const insert = db.prepare(`INSERT OR IGNORE INTO news_content (news_id, content, mood) VALUES (?, ?, ?)`)

  const insertMany = db.transaction((items: NewsContent[]) => {
    const seen = new Set<string>()
    for (const nc of items) {
      const key = `${nc.newsId}::${nc.content}`
      if (seen.has(key)) continue
      seen.add(key)
      insert.run(nc.newsId, nc.content, String(nc.mood))
    }
  })

  try {
    insertMany(newsContent)
    log(`Saved ${newsContent.length} news content items (duplicates ignored)`)
  } catch (err) {
    if (err instanceof SqliteError) {
      logError(true, `Error saving news content batch: ${err.message}`)
    } else {
      logError(true, `Error saving news content batch: ${err}`)
    }
  }
}

export function getAllNewsDb() {
  const query = db.prepare(`SELECT * FROM news`)
  return query.all() as NewsItem[] | undefined
}

export function getNewsByIdDb(id: number) {
  const query = db.prepare(`SELECT * FROM news WHERE id = ?`)
  return query.get(id) as NewsItem | undefined
}

export function getAllNewsContentDb() {
  const query = db.prepare(`SELECT * FROM news_content`)
  return query.all() as NewsContent[] | undefined
}

export function getNewsContentInMoodDb(newsId: number, mood: Mood) {
  const query = db.prepare(`SELECT * FROM news_content WHERE news_id = ? AND mood = ?`)
  return query.get(newsId, mood) as NewsContent | undefined
}