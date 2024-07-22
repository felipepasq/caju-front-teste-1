import styled, { keyframes } from 'styled-components'

const skeletonAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const Skeleton = styled.div<{ height: string; width: string }>`
  background: linear-gradient(90deg, #f0f3f5 32%, #e4e7e9 50%, #f0f3f5 68%);
  background-size: 200% 100%;
  animation: ${skeletonAnimation} 0.8s ease-in-out infinite alternate;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`
