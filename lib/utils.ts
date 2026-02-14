import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return getGoogleDriveImageUrl(path)
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${basePath}${normalizedPath}`
}


export function getGoogleDriveImageUrl(path: string) {
  if (!path) return path

  try {
    const url = new URL(path)
    const isGoogleDriveHost =
      url.hostname.includes("drive.google.com") ||
      url.hostname.includes("drive.usercontent.google.com")

    if (!isGoogleDriveHost) {
      return path
    }

    const fileIdFromSearch = url.searchParams.get("id")
    const fileIdFromPath = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1]
    const fileId = fileIdFromSearch || fileIdFromPath

    if (!fileId) {
      return path
    }

    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`
  } catch {
    return path
  }
}
