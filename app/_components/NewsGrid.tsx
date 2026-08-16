"use client"
import React from "react"
import { Box } from "@mui/material"
import NewsCard from "./NewsCard"

type NewsItem = {
  id: string
  title: string
  summary?: string
  category?: string
  pubDate?: string
  link?: string
}

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(4, 1fr)'
        }
      }}
    >
      {items.map((item) => (
        <Box key={item.id}>
          <NewsCard news={item} />
        </Box>
      ))}
    </Box>
  )
}
