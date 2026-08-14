import { env } from './env-storage'

export function log(...message: any[]) {
  if (env.NODE_ENV === 'development') {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}]`, message)
  }
}

export function logError(...message: any[]): void
export function logError(override: boolean = false, ...message: any[]) {
  if (env.NODE_ENV === 'development' || override) {
    const timestamp = new Date().toISOString()
    console.error(`[${timestamp}]`, message)
  }
}