"use client"
import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Container, Typography, Box, CircularProgress, Link as MuiLink, IconButton, FormControl, Select, MenuItem, InputLabel } from "@mui/material"
import { toRussianError } from "../../_components/errorUtils"
import { formatDateShort } from "../../_components/dateUtils"
import MoodToggle from "../../_components/MoodToggle"
import MarkdownRenderer from "../../_components/MarkdownRenderer"
import ErrorAlert from "../../_components/ErrorAlert"

type Meta = { id: string; title: string; category?: string; pubDate?: string; link?: string; content?: string }

export default function NewsDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const [meta, setMeta] = useState<Meta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [originalContent, setOriginalContent] = useState<string>('')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchMeta = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/get-news-meta/${encodeURIComponent(id)}`)
        if (!res.ok) {
          await res.json().catch(() => ({}))
          throw new Error(toRussianError(res, null, 'Новость не найдена'))
        }
        const json = await res.json()
        setMeta(json)
        // fetch original (standard) content explicitly
        try {
          const cr = await fetch(`/api/get-news-content/${encodeURIComponent(id)}/standard`)
          if (cr.ok) {
            const cj = await cr.json().catch(() => ({}))
            setOriginalContent(cj?.content ?? '')
          } else {
            setOriginalContent('')
          }
        } catch {
          setOriginalContent('')
        }
      } catch (e: any) {
        setError(toRussianError(null, e, 'Ошибка при загрузке'))
      } finally {
        setLoading(false)
      }
    }

    fetchMeta()
  }, [id])

  if (loading) return <Container sx={{ py: 4 }}><CircularProgress /></Container>
  if (error) return <Container sx={{ py: 4 }}><ErrorAlert message={error} /></Container>
  if (!meta) return <Container sx={{ py: 4 }}><Typography>Новость не найдена</Typography></Container>

  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => router.push('/')} aria-label="back">
            <img src="/images/arrow-sm-left-svgrepo-com.svg" alt="back" width={20} height={20} />
          </IconButton>
          <Box>
            <Typography variant="h5">{meta.title}</Typography>
            {meta.link && (
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                <MuiLink href={meta.link} target="_blank" rel="noreferrer">{meta.link}</MuiLink>
              </Typography>
            )}
            <Typography variant="caption" sx={{ mt: 1 }}>{meta.category} — {formatDateShort(meta.pubDate)}</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Mood selector combobox (Select) */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="mood-select-label">Настроение</InputLabel>
            <Select
              labelId="mood-select-label"
              id="mood-select"
              value={selectedMood ?? ''}
              label="Настроение"
              onChange={(e) => setSelectedMood(e.target.value ? String(e.target.value) : null)}
            >
              <MenuItem value="">— Выбрать настроение —</MenuItem>
              <MenuItem value="positive">Позитивно</MenuItem>
              <MenuItem value="negative">Негативно</MenuItem>
              <MenuItem value="ironic">Иронично</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <MoodToggle id={meta.id} original={originalContent ?? ''} selectedMood={selectedMood} />
    </Container>
  )
}
