"use client"
import React, { useEffect, useState } from "react"
import { Container, Typography, Box, Button, CircularProgress } from "@mui/material"
import NewsGrid from "./_components/NewsGrid"
import ErrorAlert from "./_components/ErrorAlert"

type NewsItem = { id: string; title: string; summary?: string; category?: string; pubDate?: string; link?: string }

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadNews = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/get-all-news')
      if (!res.ok) {
        const b = await res.json().catch(() => ({}))
        throw new Error(b?.message || 'Ошибка при получении списка')
      }
      const json = await res.json()
      setNews(Array.isArray(json) ? json : [])
    } catch (e: any) {
      setError(e?.message ?? 'Ошибка при получении данных')
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadNews() }, [])

  const refreshRss = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/fetch-rss', { method: 'POST' })
      if (!res.ok) throw new Error('Ошибка обновления RSS')
      await loadNews()
    } catch (e: any) {
      setError(e?.message ?? 'Ошибка при обновлении RSS')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Все новости</Typography>
        <Button variant="contained" onClick={refreshRss} disabled={loading}>Обновить RSS</Button>
      </Box>

      {loading && !news && <CircularProgress />}
      {error && <ErrorAlert message={error} />}
      {news && <NewsGrid items={news} />}
    </Container>
  )
}
