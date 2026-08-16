"use client"
import React from "react"
import { Card, CardContent, Typography, CardActions, Button, Stack, Chip, CardActionArea } from "@mui/material"
import Link from "next/link"
import { formatDateShort } from "./dateUtils"

type NewsItem = {
  id: string
  title: string
  summary?: string
  category?: string
  pubDate?: string
  link?: string
}

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={Link} href={`/news/${encodeURIComponent(news.id)}`} sx={{ flex: 1, textAlign: 'left' }}>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h6" component="h3">{news.title}</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {news.category && <Chip label={news.category} size="small" />}
              {news.pubDate && <Typography variant="caption">{formatDateShort(news.pubDate)}</Typography>}
            </Stack>
            {news.summary && <Typography variant="body2" sx={{ mt: 1 }}>{news.summary}</Typography>}
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {news.link && (
          <Button size="small" component="a" href={news.link} target="_blank" rel="noreferrer">Источник</Button>
        )}
      </CardActions>
    </Card>
  )
}
