import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as S from './styles'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export const Overlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.AlertDialogOverlay>
>((props, ref) => <S.StyledOverlay ref={ref} {...props} />)
