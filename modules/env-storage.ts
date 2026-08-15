import { config } from 'dotenv'
config()

export const env = {
  HF_TOKEN: process.env.HF_TOKEN || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_KEY: process.env.API_KEY || '',
  API_URL: process.env.API_URL || '',
  RSS_URL: process.env.RSS_URL || '',
}