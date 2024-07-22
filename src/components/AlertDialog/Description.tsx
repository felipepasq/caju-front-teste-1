import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react'
import * as S from './styles'

export const Description = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Description>,
  ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>
>((props, ref) => <S.StyledDescription {...props} ref={ref} />)
