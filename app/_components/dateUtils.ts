export function formatDateShort(input?: string | Date | null): string {
  if (!input) return ''
  const d = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(d.getTime())) return String(input)

  const pad = (n: number) => n.toString().padStart(2, '0')
  const day = pad(d.getDate())
  const month = pad(d.getMonth() + 1)
  const year = pad(d.getFullYear() % 100)
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())

  return `${day}.${month}.${year} ${hours}:${minutes}`
}
