import { config } from 'dotenv'
config()

export const env = {
  API_KEY: process.env.API_KEY || '',
  API_URL: process.env.API_URL || '',
  RSS_URL: process.env.RSS_URL || '',
}