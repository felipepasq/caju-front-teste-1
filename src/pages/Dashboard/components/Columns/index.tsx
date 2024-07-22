import * as S from './styles'
import RegistrationCard from '../RegistrationCard'
import { TRegistration, RegistrationStatus } from '~/types'

const allColumns = [
  { status: RegistrationStatus.REVIEW, title: 'Pronto para revisar' },
  { status: RegistrationStatus.APPROVED, title: 'Aprovado' },
  { status: RegistrationStatus.REPROVED, title: 'Reprovado' },
]

type Props = {
  registrations?: TRegistration[]
}
const Columns = ({ registrations }: Props) => {
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
                {registrations?.map(
                  (registration) =>
                    registration.status === column.status && (
                      <RegistrationCard
                        registration={registration}
                        key={registration.id}
                      />
                    ),
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
