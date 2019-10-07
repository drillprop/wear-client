import styled from 'styled-components';

export const SignHeroWrapper = styled.div`
  width: 50vw;
  display: flex;
`;

export const HeroImage = styled.div<{ image: string }>`
  position: absolute;
  height: 100vh;
  z-index: -1;
  top: 0;
  width: 50vw;
  background-color: black;
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    background-image: ${({ image }) => `url(${image})`};
    height: 100vh;
    background-position: center;
    background-size: cover;
    opacity: 0.5;
  }
`;
