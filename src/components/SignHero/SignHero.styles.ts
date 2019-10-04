import styled from 'styled-components';

export const SignHeroWrapper = styled.div``;

export const HeroImage = styled.div<{ image: string }>`
  margin: 0;
  position: absolute;
  z-index: -2;
  height: 100vh;
  top: 0;
  width: 50vw;
  background: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;
