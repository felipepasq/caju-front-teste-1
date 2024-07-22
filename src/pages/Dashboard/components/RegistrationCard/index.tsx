import { AlertDialog, ButtonSmall } from '~/components'
import * as S from './styles'
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi'
import { TRegistration, RegistrationStatus } from '~/types'
import { ReactNode, useState } from 'react'
import { useDeleteRegistration, usePatchRegistration } from '~/hooks'
import { CardSkeleton } from '../CardSkeleton'

type Props = {
  registration: TRegistration
}

const RegistrationCard = ({ registration }: Props) => {
  const [alert, setAlert] = useState<{
    isOpen: boolean
    type?: RegistrationStatus | 'DELETE'
  }>({ isOpen: false, type: undefined })
  const { patchRegistrationMutate, isPatching } = usePatchRegistration()
  const { deleteRegistrationMutate, isDeleting } = useDeleteRegistration()
  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false })
  }

  const handleOpenAlert = (type: RegistrationStatus | 'DELETE') => {
    setAlert({ isOpen: true, type })
  }

  const registrationButtonMap: Record<RegistrationStatus, ReactNode> = {
    REPROVED: (
      <ButtonSmall
        onClick={() => handleOpenAlert(RegistrationStatus.REVIEW)}
        bgcolor="#ff8858"
      >
        Revisar novamente
      </ButtonSmall>
    ),
    APPROVED: (
      <ButtonSmall
        onClick={() => handleOpenAlert(RegistrationStatus.REVIEW)}
        bgcolor="#ff8858"
      >
        Revisar novamente
      </ButtonSmall>
    ),
    REVIEW: (
      <>
        <ButtonSmall
          onClick={() => handleOpenAlert(RegistrationStatus.REPROVED)}
          bgcolor="rgb(255, 145, 154)"
        >
          Reprovar
        </ButtonSmall>
        <ButtonSmall
          onClick={() => handleOpenAlert(RegistrationStatus.APPROVED)}
          bgcolor="rgb(155, 229, 155)"
        >
          Aprovar
        </ButtonSmall>
      </>
    ),
  }

  const registrationDescriptionMap: Record<
    RegistrationStatus | 'DELETE',
    string
  > = {
    REPROVED: `Essa ação vai reprovar o usuário ${registration.employeeName}.`,
    APPROVED: `Essa ação vai aprovar o usuário ${registration.employeeName}.`,
    REVIEW: `Essa ação mandar o usuário ${registration.employeeName} para revisão.`,
    DELETE: `Esta ação não pode ser desfeita. Isso irá deletar permanentemente a conta do usuário ${registration.employeeName}.`,
  }

  const handleClick = () => {
    setAlert({ isOpen: false, type: undefined })
    if (alert.type === 'DELETE') {
      deleteRegistrationMutate({ id: registration.id })
    } else if (alert.type) {
      patchRegistrationMutate({ id: registration.id, status: alert.type })
    }
  }

  return isDeleting || isPatching ? (
    <CardSkeleton />
  ) : (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{registration.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{registration.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{registration.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {registrationButtonMap[registration.status]}
        <HiOutlineTrash onClick={() => handleOpenAlert('DELETE')} />
      </S.Actions>
      <AlertDialog.Root open={alert.isOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Você tem certeza?</AlertDialog.Title>
            <AlertDialog.Description>
              {alert.type ? registrationDescriptionMap[alert.type] : ''}
            </AlertDialog.Description>
            <S.ButtonContainer>
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
                  onClick={handleClick}
                >
                  Confirmar
                </ButtonSmall>
              </AlertDialog.Action>
            </S.ButtonContainer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </S.Card>
  )
}

export default RegistrationCard
