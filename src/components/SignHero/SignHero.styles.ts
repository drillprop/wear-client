import styled from 'styled-components';

export const SignHeroWrapper = styled.div`
  margin-top: 90px;
  width: 50vw;
  display: flex;
`;

export const HeroImage = styled.div<{ image: string }>`
  position: fixed;
  height: calc(100% - 90px);
  z-index: -1;
  top: 0;
  width: 50%;
  margin-top: 90px;
  background-color: black;
  ::after {
    position: fixed;
    content: '';
    width: 50%;
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
