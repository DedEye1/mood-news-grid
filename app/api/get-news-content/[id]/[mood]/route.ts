import { getNewsContentById } from "@modules/scraping-handler"
import { getNewsContentInMood } from "@modules/mood-changer"
import { NextResponse } from "next/server"
import { MOODS, NewsContent, type Mood } from "@classes/news-content"
import { log, logError } from "@modules/dev-log"
import { getNewsContentInMoodDb, saveNewsContentDb } from "@modules/db-handler"

export async function GET(request: Request, context: any) {
  const paramsObj = await (context?.params ?? {})
  const idStr = paramsObj?.id
  const moodStr = paramsObj?.mood
  log("request.url:", request.url, "raw params:", paramsObj)

  const id = idStr ? Number(idStr) : undefined
  const mood = moodStr as Mood | undefined

  if (!id || !mood || !MOODS.includes(mood)) {
    logError('No params provided')
    return NextResponse.json({ error: 'NO_PARAMS', message: 'There is no valid id or mood params provided' }, { status: 400 })
  }

  const baseNewsContentDb = getNewsContentInMoodDb(id, mood)
  if (baseNewsContentDb) {
    log('Got news from db')
    return NextResponse.json(baseNewsContentDb, { status: 200 })
  }

  let baseNewsContent: NewsContent | undefined
  baseNewsContent = await getNewsContentById(id)
  if (!baseNewsContent) {
    logError('No content')
    return NextResponse.json({ error: 'NOT_FOUND', message: 'There is no news' }, { status: 404 })
  }
  saveNewsContentDb(baseNewsContent)

  if (mood === 'standard') {
    log('Got news in standard mood')
    return NextResponse.json(baseNewsContent, { status: 200 })
  }

  const changedNewsContent = await getNewsContentInMood(baseNewsContent, mood)
  if (!changedNewsContent) {
    logError('No transformed content')
    return NextResponse.json({ error: 'NOT_FOUND', message: 'There is no transformed news to mood' }, { status: 404 })
  }

  log(`Got news in ${mood} mood`)
  saveNewsContentDb(changedNewsContent)
  return NextResponse.json(changedNewsContent, { status: 200 })
}