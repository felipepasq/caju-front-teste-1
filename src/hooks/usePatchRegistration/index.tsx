import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { patchRegistration } from '~/services'
import { RegistrationStatus } from '~/types'

export const usePatchRegistration = () => {
  const queryClient = useQueryClient()
  const { mutate: patchRegistrationMutate, isPending: isPatching } =
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
        toast.success('Estado do usuário atualizado com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao atualizar estado do usuário.')
      },
    })

  return { patchRegistrationMutate, isPatching }
}
