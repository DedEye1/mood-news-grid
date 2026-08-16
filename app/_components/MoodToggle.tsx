"use client"
import React, { useState } from "react"
import { Stack, Button, Box, CircularProgress } from "@mui/material"
import MarkdownRenderer from "./MarkdownRenderer"
import ErrorAlert from "./ErrorAlert"

export default function MoodToggle({ id, original }: { id: string; original: string }) {
  const [mood, setMood] = useState<string | null>(null)
  const [generated, setGenerated] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMood = async (m: string) => {
    setError(null)
    setLoading(true)
    setMood(m)
    setGenerated(null)
    try {
      const res = await fetch(`/api/get-news-content/${encodeURIComponent(id)}/${encodeURIComponent(m)}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Ошибка сервера')
      }
      const json = await res.json()
      // assume api returns { content: 'markdown...' }
      setGenerated(json?.content ?? '')
    } catch (e: any) {
      setError(e?.message ?? 'Ошибка при запросе')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button variant={mood === 'happy' ? 'contained' : 'outlined'} onClick={() => sendMood('happy')} disabled={loading}>Позитивно</Button>
        <Button variant={mood === 'neutral' ? 'contained' : 'outlined'} onClick={() => sendMood('neutral')} disabled={loading}>Нейтрально</Button>
        <Button variant={mood === 'sad' ? 'contained' : 'outlined'} onClick={() => sendMood('sad')} disabled={loading}>Печально</Button>
        {loading && <CircularProgress size={20} />}
      </Stack>

      {error && <ErrorAlert message={error} />}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <MarkdownRenderer source={original} />
        </Box>
        {generated !== null && (
          <Box sx={{ flex: 1 }}>
            <MarkdownRenderer source={generated} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
