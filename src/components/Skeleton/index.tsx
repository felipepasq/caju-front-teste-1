import styled, { keyframes } from 'styled-components'

const skeletonAnimation = keyframes({
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 },
})

export const Skeleton = styled.div<{ height: string; width: string }>`
  background: linear-gradient(90deg, #e0e0e0 32%, #c0c0c0 50%, #e0e0e0 68%);
  background-size: 200% 100%;
  animation: ${skeletonAnimation} 0.8s ease-in-out infinite alternate;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`
