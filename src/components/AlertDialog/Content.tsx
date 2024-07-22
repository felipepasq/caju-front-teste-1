import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react'
import * as S from './styles'

export const Content = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithRef<typeof AlertDialogPrimitive.Content>
>((props, ref) => <S.StyledContent {...props} ref={ref} />)
