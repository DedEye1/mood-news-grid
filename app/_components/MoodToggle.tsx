"use client"
import React, { useState } from "react"
import { Stack, Button, Box, CircularProgress } from "@mui/material"
import { toRussianError } from "./errorUtils"
import MarkdownRenderer from "./MarkdownRenderer"
import ErrorAlert from "./ErrorAlert"

export default function MoodToggle({ id, original, selectedMood }: { id: string; original: string; selectedMood: string | null }) {
  const [generated, setGenerated] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const allowed = ['standard','positive','negative','ironic']

  // When selectedMood changes, fetch generated content (or clear when null)
  React.useEffect(() => {
    let mounted = true
    const fetchGenerated = async () => {
      if (!selectedMood) {
        setGenerated(null)
        setError(null)
        return
      }
      setLoading(true)
      setError(null)
      setGenerated(null)
      try {
        const moodParam = allowed.includes(selectedMood) ? selectedMood : 'standard'
        const res = await fetch(`/api/get-news-content/${encodeURIComponent(id)}/${encodeURIComponent(moodParam)}`)
        if (!res.ok) {
          await res.json().catch(() => ({}))
          throw new Error(toRussianError(res, null, 'Ошибка сервера'))
        }
        const json = await res.json()
        if (!mounted) return
        setGenerated(json?.content ?? '')
      } catch (e: any) {
        if (!mounted) return
        setError(toRussianError(null, e, 'Ошибка при запросе'))
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    fetchGenerated()

    return () => { mounted = false }
  }, [selectedMood, id])

  return (
    <Box>
      {loading && <Box sx={{ mb: 2 }}><CircularProgress size={20} /></Box>}

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
