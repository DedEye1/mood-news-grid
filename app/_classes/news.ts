export class NewsItem {
  id: number
  title: string
  link: URL
  description: string
  category: string
  pubDate: Date
  constructor(id: number, title: string, link: URL, description: string, category: string, pubDate: Date) {
    this.id = id
    this.title = title
    this.link = link
    this.description = description
    this.category = category
    this.pubDate = pubDate
  }
}