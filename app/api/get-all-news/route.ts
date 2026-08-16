import { getAllNewsDb } from "@modules/db-handler"
import { NextResponse } from "next/server"

export function GET() {
  const newsList = getAllNewsDb()

  if (!newsList || newsList.length === 0) {
    return NextResponse.json({ error: 'NOT_FOUND', message: 'There is no news list' }, { status: 404 })
  }

  return NextResponse.json(newsList, { status: 200 })
}