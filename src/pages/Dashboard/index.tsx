import Columns from './components/Columns'
import * as S from './styles'
import { SearchBar } from './components/Searchbar'
import { maskCpf } from '~/utils'
import { useGetRegistrations } from '~/hooks'
import { useState } from 'react'

export const DashboardPage = () => {
  const [search, setSearch] = useState('')
  const { registrations } = useGetRegistrations(search)

  const handleSearch = (search: string) => {
    if (search.length === 11 || search.length === 0) {
      setSearch(maskCpf(search))
    }
  }

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} search={search} />
      <Columns registrations={registrations} />
    </S.Container>
  )
}
