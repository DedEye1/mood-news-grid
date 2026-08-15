import { env } from '@modules/env-storage'
import { logError } from '@modules/dev-log'
import { NewsContent } from '@classes/news-content'
import { getNewsById } from '@modules/db-handler'

class FirecrawlRequestBody {
  url: string
  onlyMainContent: boolean = true
  includeTags: string[] = ["article"]
  formats: string[] = ["markdown"]
  constructor(url: string) {
    this.url = url
  }
}
const options: RequestInit = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${env.API_KEY}`,
    'Content-Type': 'application/json'
  },
}

export async function getMdFromNewsLink(url: string): Promise<string | undefined> {
  try {
    const requestBody = new FirecrawlRequestBody(url)
    options.body = JSON.stringify(requestBody)

    const response = await fetch(env.API_URL, options)
    const data = (await response.json()).data.markdown

    return data
  } catch (error) {
    if (error instanceof Error) {
      logError(true, error.message)
    }
  }
}

export async function getNewsContentById(newsId: number): Promise<NewsContent | undefined> {
  try {
    const news = getNewsById(newsId)

    const requestBody = new FirecrawlRequestBody(news.link.toString())
    options.body = JSON.stringify(requestBody)

    const response = await fetch(env.API_URL, options)
    const data = (await response.json()).data.markdown

    return new NewsContent(news.id, data, 'standard')
  } catch (error) {
    if (error instanceof Error) {
      logError(true, error.message)
    }
  }
}