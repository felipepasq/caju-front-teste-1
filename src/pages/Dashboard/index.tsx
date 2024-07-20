import Columns from './components/Columns'
import * as S from './styles'
import { SearchBar } from './components/Searchbar'
import { useGetRegistrations } from '~/hooks'
import { useState } from 'react'

const DashboardPage = () => {
  const [search, setSearch] = useState('')

  const { registrations } = useGetRegistrations(search)

  const handleSearch = (search: string) => {
    if (search.length === 11 || search.length === 0) {
      setSearch(search)
    }
  }

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} />
      <Columns registrations={registrations} />
    </S.Container>
  )
}
export default DashboardPage
