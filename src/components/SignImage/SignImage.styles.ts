import styled from 'styled-components';

export const HeroImage = styled.div<{ image: string }>`
  position: relative;
  height: 100%;
  z-index: -1;
  width: 100%;
  background-color: black;
  ::after {
    position: absolute;
    content: '';
    width: 100%;
    background-image: ${({ image }) => `url(${image})`};
    height: 100%;
    background-position: center;
    background-size: cover;
    opacity: 0.5;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
