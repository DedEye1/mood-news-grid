import { env } from '@modules/env-storage'
import Database from 'better-sqlite3'

const db = new Database(env.DB_PATH)

db.exec(`
  DROP TABLE IF EXISTS news_content
`)

db.exec(`
  DROP TABLE IF EXISTS news
`)