import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteRegistration } from '~/services'

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteRegistrationMutate, isPending: isDeleting } =
    useMutation({
      mutationFn: ({ id }: { id: string }) => {
        return deleteRegistration(id)
      },
      onSuccess: () => {
        toast.success('Usuário deletado com sucesso!')
        queryClient.invalidateQueries({
          queryKey: ['registrations'],
          refetchType: 'all',
        })
      },
      onError: () => {
        toast.error('Ocorreu um erro ao deletar o usuário')
      },
    })

  return { deleteRegistrationMutate, isDeleting }
}
