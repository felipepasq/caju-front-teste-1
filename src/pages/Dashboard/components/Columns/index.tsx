import * as S from './styles'
import RegistrationCard from '../RegistrationCard'
import { TRegistration, RegistrationStatus } from '~/types'
import { CardSkeleton } from '../CardSkeleton'

const allColumns = [
  { status: RegistrationStatus.REVIEW, title: 'Pronto para revisar' },
  { status: RegistrationStatus.APPROVED, title: 'Aprovado' },
  { status: RegistrationStatus.REPROVED, title: 'Reprovado' },
]

type Props = {
  registrations?: TRegistration[]
  isLoadingRegistrations: boolean
}
const Columns = ({ registrations, isLoadingRegistrations }: Props) => {
  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {isLoadingRegistrations ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : (
                  registrations?.map(
                    (registration) =>
                      registration.status === column.status && (
                        <RegistrationCard
                          registration={registration}
                          key={registration.id}
                        />
                      ),
                  )
                )}
              </S.ColumnContent>
            </>
          </S.Column>
        )
      })}
    </S.Container>
  )
}
export default Columns
