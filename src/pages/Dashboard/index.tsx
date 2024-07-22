import Columns from './components/Columns'
import * as S from './styles'
import { SearchBar } from './components/Searchbar'
import { useGetRegistrations, useSearchParams } from '~/hooks'
import { maskCpf, removeCpfMask } from '~/utils'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const DashboardPage = () => {
  const { searchParam } = useSearchParams()
  const { replace } = useHistory()
  const [search, setSearch] = useState(maskCpf(searchParam))
  const { registrations, isLoadingRegistrations, isFetchingRegistrations } =
    useGetRegistrations()

  const handleSearch = (value: string) => {
    let url = '/dashboard'
    setSearch(value)
    if (value === '' || value.length === 14) {
      if (value.length === 14) {
        url += `?search=${removeCpfMask(value)}`
      }
      replace(url)
    }
  }

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} search={search} />
      <Columns
        registrations={registrations}
        isLoadingRegistrations={
          isLoadingRegistrations || isFetchingRegistrations
        }
      />
    </S.Container>
  )
}
