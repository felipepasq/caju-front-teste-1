import { useQuery } from '@tanstack/react-query'
import { getRegisters } from '~/services/registers'

export const useGetRegisters = () => {
  const { data: registers } = useQuery({
    queryKey: ['register'],
    queryFn: getRegisters,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  })

  return {
    registers,
  }
}
