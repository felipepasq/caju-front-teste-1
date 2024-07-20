import Collumns from './components/Columns'
import * as S from './styles'
import { SearchBar } from './components/Searchbar'
import { useGetRegisters } from '~/hooks'

const DashboardPage = () => {
  const { registers } = useGetRegisters()
  console.log(registers)

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registers} />
    </S.Container>
  )
}
export default DashboardPage
