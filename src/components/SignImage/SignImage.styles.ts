import styled from 'styled-components';
import { black } from '../../styles/colors';

export const HeroImage = styled.div<{ image: string }>`
  position: relative;
  height: 100%;
  z-index: -1;
  width: 100%;
  background-image: ${({ image }) => `url(${image})`};
  background-position: center;
  background-size: cover;
  ::after {
    position: absolute;
    content: '';
    background-color: ${black};
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
