import { getNewsContentById } from '@modules/scraping-handler'

async function main() {
  const news = await getNewsContentById(1109503)
  console.log(news)
}

main()