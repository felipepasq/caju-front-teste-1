import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRegistration } from '~/services'

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteRegistrationMutate, isPending: isDeleting } =
    useMutation({
      mutationFn: ({ id }: { id: string }) => {
        return deleteRegistration(id)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['registrations'],
          refetchType: 'all',
        })
      },
    })

  return { deleteRegistrationMutate, isDeleting }
}
