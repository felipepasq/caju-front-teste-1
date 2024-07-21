import { HiRefresh } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

import { IconButton, Button } from '~/components'
import TextField from '~/components/TextField'
import routes from '~/router/routes'
import * as S from './styles'

type Props = {
  handleSearch: (search: string) => void
  search: string
}

export const SearchBar = ({ handleSearch }: Props) => {
  const history = useHistory()

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser)
  }

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  )
}
