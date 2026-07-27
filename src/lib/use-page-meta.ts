import { useEffect } from 'react'

/**
 * Minimal document title/description handling for the SPA. When the project
 * later moves to SSR, this hook is the single place to swap for a real head
 * manager without touching page components.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (!description) return

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
  }, [title, description])
}
