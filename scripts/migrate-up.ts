import { env } from '@modules/env-storage'
import Database from 'better-sqlite3'

const db = new Database(env.DB_PATH)

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

db.exec(`
  CREATE TABLE IF NOT EXISTS news_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    news_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    mood TEXT NOT NULL,
    FOREIGN KEY (news_id) REFERENCES news (id)
  )
`)

db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS idx_news_content_unique
  ON news_content (news_id, content);
`)