"use client"
import React from "react"
import { Box } from "@mui/material"
import { marked } from "marked"

export default function MarkdownRenderer({ source }: { source: string }) {
  const html = React.useMemo(() => {
    try {
      return marked.parse(source || "")
    } catch {
      return String(source)
    }
  }, [source])

  return <Box sx={{ '& img': { maxWidth: '100%' } }} dangerouslySetInnerHTML={{ __html: html }} />
}
