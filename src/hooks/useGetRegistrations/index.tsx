import { useQuery } from '@tanstack/react-query'
import { getRegistrations } from '~/services'

export const useGetRegistrations = (search: string) => {
  const { data: registrations } = useQuery({
    queryKey: ['registrations', search],
    queryFn: () => getRegistrations(search),
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    staleTime: Infinity,
  })

  return {
    registrations,
  }
}
