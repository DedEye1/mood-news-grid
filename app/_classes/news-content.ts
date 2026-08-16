export class NewsContent {
  newsId: number
  content: string
  mood: Mood
  constructor(newsId: number, content: string, mood: Mood) {
    this.newsId = newsId
    this.content = content
    this.mood = mood
  }
}

export type Mood = 'positive' | 'negative' | 'ironic' | 'standard'
export const MOODS = ['positive', 'negative', 'ironic', 'standard']