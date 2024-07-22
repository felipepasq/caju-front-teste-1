import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import routes from '~/router/routes'
import { postRegistration } from '~/services'
import { TRegistration } from '~/types'

export const usePostRegistration = () => {
  const queryClient = useQueryClient()
  const history = useHistory()
  const { mutate: postMutateRegistration, isPending: isPosting } = useMutation({
    mutationFn: (newRegistration: TRegistration) => {
      return postRegistration(newRegistration)
    },
    onSuccess: () => {
      toast.success('Usuário adicionado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['registrations'],
        refetchType: 'all',
      })
      history.push(routes.dashboard)
    },
    onError: () => {
      toast.error('Erro ao adicionar usuário')
    },
  })

  return { postMutateRegistration, isPosting }
}
