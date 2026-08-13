import { config } from 'dotenv'
config()

export const env = {
  API_KEY: process.env.API_KEY || '',
  URL_RSS: process.env.URL_RSS || '',
}