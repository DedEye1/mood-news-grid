export class NewsContent {
  id: number
  news_id: number
  content: string
  mood: string
  constructor(id: number, news_id: number, content: string, mood: string) {
    this.id = id
    this.news_id = news_id
    this.content = content
    this.mood = mood
  }
}