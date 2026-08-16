export function toRussianError(res?: Response | null, err?: any, defaultMsg = 'Произошла ошибка') {
  // Prefer mapping by response status to Russian messages.
  if (res) {
    if (res.status === 404) return 'Не найдено'
    if (res.status === 401) return 'Требуется авторизация'
    if (res.status >= 500) return 'Внутренняя ошибка сервера'
    return defaultMsg
  }

  // Network or unexpected error
  return err ? defaultMsg : defaultMsg
}
