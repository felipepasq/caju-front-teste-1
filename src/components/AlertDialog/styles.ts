import styled, { keyframes } from 'styled-components'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const StyledOverlay = styled(AlertDialog.Overlay)`
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  background-color: #00000066;
`

export const StyledContent = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  :focus {
    outline: none;
  }
`

export const StyledTitle = styled(AlertDialog.Title)`
  margin: 0;
  color: #211f26;
  font-size: 17px;
  font-weight: 500;
`

export const StyledDescription = styled(AlertDialog.Description)`
  margin-bottom: 20;
  color: '#65636D';
  font-size: 15;
  line-height: 1.5;
`
