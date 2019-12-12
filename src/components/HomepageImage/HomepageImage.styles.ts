import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const ImageTitle = styled.h1`
  margin: 0;
  cursor: pointer;
  letter-spacing: 4px;
  text-transform: uppercase;
  position: absolute;
  font-size: 36px;
  padding: 12px;
  width: 100%;
  background-color: white;
  text-align: center;
  z-index: 1;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  opacity: 1;
  :hover + div {
    cursor: pointer;
    ::after {
      transform: scale(1.1);
      transition: transform 4s, opacity 3s;
      opacity: 0.6;
    }
  }
`;

export const Image = styled.div<{ imageUrl: string }>`
  height: 600px;

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
    opacity: 0.7;
  }
`;
