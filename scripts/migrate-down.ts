import Database from 'better-sqlite3'

const db = new Database('news.db')

db.exec(`
  DROP TABLE IF EXISTS news_content
`)

db.exec(`
  DROP TABLE IF EXISTS news
`)