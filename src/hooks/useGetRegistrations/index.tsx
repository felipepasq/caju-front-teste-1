import { useQuery } from '@tanstack/react-query'
import { getRegistrations } from '~/services'
import { useSearchParams } from '../useSearchParams'
import { toast } from 'react-toastify'

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

  if (isError) {
    toast.error('Ocorreu um erro ao carregar os registros.')
  }

  return {
    registrations,
    refetch,
    isLoadingRegistrations,
    isFetchingRegistrations,
  }
}
