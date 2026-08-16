import { getNewsByIdDb } from "@modules/db-handler"
import { type Mood } from "@classes/news-content"
import { logError } from "@modules/dev-log"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  context?: { params: Promise<{ id: number; mood: Mood }> | { id?: number; mood?: Mood } }
) {
  const params = context?.params ?? {}
  const { id } = await params

  if (!id) {
    logError('No params provided')
    return NextResponse.json({ error: 'NO_PARAMS', message: 'There is no valid id params provided' }, { status: 400 })
  }

  const news = getNewsByIdDb(id)

  if (!news) {
    return NextResponse.json({ error: 'NOT_FOUND', message: 'There is no news meta' }, { status: 404 })
  }

  return NextResponse.json(news, { status: 200 })
}