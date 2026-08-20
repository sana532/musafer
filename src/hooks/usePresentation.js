import { createContext, useContext } from 'react'

export const PresentationContext = createContext(null)

export function usePresentation() {
  const value = useContext(PresentationContext)
  if (!value) {
    throw new Error('usePresentation must be used inside PresentationShell')
  }
  return value
}
