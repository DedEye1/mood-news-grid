"use client"
import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Container, Typography, Box, CircularProgress, Link as MuiLink } from "@mui/material"
import MoodToggle from "../../_components/MoodToggle"
import MarkdownRenderer from "../../_components/MarkdownRenderer"
import ErrorAlert from "../../_components/ErrorAlert"

type Meta = { id: string; title: string; category?: string; pubDate?: string; link?: string; content?: string }

export default function NewsDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [meta, setMeta] = useState<Meta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    fetch(`/api/get-news-meta/${encodeURIComponent(id)}`)
      .then(async (res) => {
        if (!res.ok) {
          const b = await res.json().catch(() => ({}))
          throw new Error(b?.message || 'Новость не найдена')
        }
        return res.json()
      })
      .then((json) => setMeta(json))
      .catch((e: any) => setError(e?.message ?? 'Ошибка при загрузке'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Container sx={{ py: 4 }}><CircularProgress /></Container>
  if (error) return <Container sx={{ py: 4 }}><ErrorAlert message={error} /></Container>
  if (!meta) return <Container sx={{ py: 4 }}><Typography>Новость не найдена</Typography></Container>

  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h5">{meta.title}</Typography>
          <Typography variant="caption">{meta.category} — {meta.pubDate}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          {meta.link && (
            <MuiLink href={meta.link} target="_blank" rel="noreferrer">Оригинал</MuiLink>
          )}
        </Box>
      </Box>

      <MoodToggle id={meta.id} original={meta.content ?? ''} />
    </Container>
  )
}
