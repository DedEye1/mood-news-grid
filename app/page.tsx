"use client"
import React, { useEffect, useState } from "react"
import { Container, Typography, Box, IconButton, CircularProgress } from "@mui/material"
import Image from 'next/image'
import { toRussianError } from "./_components/errorUtils"
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
        await res.json().catch(() => ({}))
        throw new Error(toRussianError(res, null, 'Ошибка при получении списка'))
      }
      const json = await res.json()
      const items = Array.isArray(json) ? (json as any[]).slice() : []
      items.sort((a: any, b: any) => {
        const ta = a?.pubDate ? Date.parse(a.pubDate) : NaN
        const tb = b?.pubDate ? Date.parse(b.pubDate) : NaN
        const na = Number.isNaN(ta) ? 0 : ta
        const nb = Number.isNaN(tb) ? 0 : tb
        return nb - na // newer first
      })
      setNews(items)
    } catch (e: any) {
      setError(toRussianError(null, e, 'Ошибка при получении данных'))
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
      if (!res.ok) throw new Error(toRussianError(res, null, 'Ошибка обновления RSS'))
      await loadNews()
    } catch (e: any) {
      setError(toRussianError(null, e, 'Ошибка при обновлении RSS'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Все новости</Typography>
        <IconButton onClick={refreshRss} disabled={loading} aria-label="refresh">
          <Image src="/images/refresh-ccw-alt-3-svgrepo-com.svg" alt="refresh" width={20} height={20} />
        </IconButton>
      </Box>

      {loading && !news && <CircularProgress />}
      {error && <ErrorAlert message={error} />}
      {news && <NewsGrid items={news} />}
    </Container>
  )
}
