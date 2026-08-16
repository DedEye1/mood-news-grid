import { getAllNewsDb } from "@modules/db-handler"
import { NextResponse } from "next/server"

export function GET() {
  const newsList = getAllNewsDb()

  return NextResponse.json(newsList, { status: 200 })
}