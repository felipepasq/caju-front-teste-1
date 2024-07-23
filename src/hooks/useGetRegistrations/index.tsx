import { useQuery } from '@tanstack/react-query'
import { getRegistrations } from '~/services'
import { useSearchParams } from '../useSearchParams'

export const useGetRegistrations = () => {
  const { searchParam } = useSearchParams()

  const {
    data: registrations,
    refetch,
    isError,
    isLoading: isLoadingRegistrations,
    isFetching: isFetchingRegistrations,
  } = useQuery({
    queryKey: ['registrations', searchParam],
    queryFn: () => getRegistrations(searchParam),
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    staleTime: Infinity,
  })

  return {
    registrations,
    refetch,
    isLoadingRegistrations,
    isFetchingRegistrations,
    isError,
  }
}
