import TextField from '~/components/TextField'
import * as S from './styles'
import { IconButton, Button, AlertDialog, ButtonSmall } from '~/components'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'
import routes from '~/router/routes'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormData, schema } from './schema'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postRegistration } from '~/services'
import { TRegistration } from '~/types'
import { maskCpf, removeCpfMask } from '~/utils'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'

export const NewUserPage = () => {
  const history = useHistory()
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const goToHome = () => {
    history.push(routes.dashboard)
  }

  const watchCpf = watch('cpf')

  const { mutate, isPending } = useMutation({
    mutationFn: (newRegistration: TRegistration) => {
      return postRegistration(newRegistration)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['registrations'],
        refetchType: 'all',
      })
      goToHome()
    },
  })

  useEffect(() => {
    setValue('cpf', maskCpf(watchCpf))
  }, [watchCpf, setValue])

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { cpf, date, email, name } = data
    mutate({
      id: uuidv4(),
      employeeName: name,
      email,
      cpf: removeCpfMask(cpf),
      admissionDate: format(date, 'dd/MM/yyyy'),
      status: 'REVIEW',
    })
  }

  const handleOpenAlert = () => {
    if (isValid) {
      setIsAlertOpen(true)
    }
    trigger()
  }

  const handleCloseAlert = () => {
    setIsAlertOpen(false)
  }

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <S.Form noValidate>
          <TextField
            placeholder="Nome"
            label="Nome"
            error={errors.name?.message}
            {...register('name')}
          />
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <TextField
            placeholder="CPF"
            label="CPF"
            error={errors.cpf?.message}
            {...register('cpf')}
          />
          <TextField
            label="Data de admissão"
            type="date"
            error={errors.date?.message}
            {...register('date')}
          />
          <AlertDialog.Root open={isAlertOpen && isValid}>
            <AlertDialog.Trigger asChild>
              <Button disabled={isPending} onClick={handleOpenAlert}>
                {isPending ? 'Carregando...' : 'Cadastrar'}
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Content>
                <AlertDialog.Title>Você tem certeza ?</AlertDialog.Title>
                <AlertDialog.Description>
                  Essa ação vai adicionar um novo usúario.
                </AlertDialog.Description>
                <S.buttonContainer>
                  <AlertDialog.Cancel asChild>
                    <ButtonSmall
                      height="32px"
                      bgcolor="#FF919A"
                      onClick={handleCloseAlert}
                    >
                      Cancelar
                    </ButtonSmall>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <ButtonSmall
                      type="submit"
                      height="32px"
                      bgcolor="#64a98c"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Confirmar
                    </ButtonSmall>
                  </AlertDialog.Action>
                </S.buttonContainer>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </S.Form>
      </S.Card>
    </S.Container>
  )
}
