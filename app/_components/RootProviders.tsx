"use client"
import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"

export default function RootProviders({ children }: { children: React.ReactNode }) {
  const theme = createTheme({ palette: { mode: 'light' } })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
