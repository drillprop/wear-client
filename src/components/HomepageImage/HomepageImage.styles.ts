import styled from 'styled-components';

export const Image = styled.div<{ imageUrl: string }>`
  height: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: black;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    ::after {
      transform: scale(1.1);
      transition: transform 4s, opacity 3s;
      opacity: 0.6;
    }
  }
  &::after {
    transition: transform 1s, opacity 2s;
    content: '';
    position: absolute;
    height: 600px;
    width: 100%;
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    background-position: center;
    background-size: cover;
    opacity: 0.6;
  }
`;
