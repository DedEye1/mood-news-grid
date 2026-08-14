import { env } from '@modules/env-storage'
import { XMLParser } from 'fast-xml-parser'
import { type NewsItem } from '@classes/news'

export async function getNewsRss() {
  const response = await fetch(env.RSS_URL)
  const rawText = await response.text()

  const parser = new XMLParser()
  const parsedData = parser.parse(rawText)

  return parsedData.rss.channel.item.map((item: any) => {
    const link = new URL(item.link)
    return {
      id: link.pathname.split('/').findLast(Boolean),
      title: item.title,
      link: link,
      description: item.description,
      category: item.category,
      pubDate: new Date(item.pubDate)
    }
  }) as NewsItem[]
}