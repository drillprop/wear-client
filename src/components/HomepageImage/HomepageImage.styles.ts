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

export const ImageTitle = styled.h1`
  letter-spacing: 4px;
  position: absolute;
  font-size: 40px;
  z-index: 5;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 10px;
  outline: 3px solid white;
  opacity: 0.8;
`;
