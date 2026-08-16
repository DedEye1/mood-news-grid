import { getNewsRss } from "@modules/news-handler"
import { saveNewsDb } from "@modules/db-handler"
import { NextResponse } from "next/server"

export async function POST() {
  const rss = await getNewsRss()
  saveNewsDb(...rss)

  return new NextResponse(null, { status: 202 })
}