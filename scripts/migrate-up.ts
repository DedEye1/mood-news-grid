import Database from 'better-sqlite3'

const db = new Database('news.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    pubDate TEXT NOT NULL
  )
`)