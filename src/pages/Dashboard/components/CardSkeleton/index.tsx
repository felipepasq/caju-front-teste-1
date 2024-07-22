import * as S from './styles'
import { Skeleton } from '~/components'
export const CardSkeleton = () => {
  return (
    <S.Container>
      <Skeleton height="23px" width="120px" />
      <Skeleton height="23px" width="180px" />
      <Skeleton height="23px" width="120px" />
      <Skeleton height="23px" width="100%" />
    </S.Container>
  )
}
