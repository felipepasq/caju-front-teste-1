import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchRegistration } from '~/services'
import { RegistrationStatus } from '~/types'

export const usePatchRegistration = () => {
  const queryClient = useQueryClient()
  const { mutate: patchRegistrationMutate, isPending: isUpdating } =
    useMutation({
      mutationFn: ({
        id,
        status,
      }: {
        id: string
        status: RegistrationStatus
      }) => {
        return patchRegistration(id, status)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['registrations'],
          refetchType: 'all',
        })
      },
    })

  return { patchRegistrationMutate, isUpdating }
}
