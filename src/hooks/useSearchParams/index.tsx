import { useLocation } from 'react-router-dom'

export const useSearchParams = () => {
  const { search } = useLocation()

  const urlParams = new URLSearchParams(search)
  const searchParam = urlParams.get('search') ?? ''

  return { searchParam }
}
