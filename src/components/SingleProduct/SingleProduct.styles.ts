import styled from 'styled-components';
import { black, white, grays } from '../../styles/colors';
import { montserrat } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const SingleProductMain = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  gap: 40px;
`;

export const SingleProductImg = styled.img`
  height: 500px;
  max-width: 100%;
  object-fit: cover;
`;

export const SingleProductInfo = styled.section`
  position: relative;
  display: grid;
  align-items: start;
  height: 500px;
`;

export const SingleProductName = styled.h1`
  font-size: ${fontSizes[5]};
  margin: 0;
  align-self: end;
  text-transform: uppercase;
`;
export const SingleProductDescription = styled.p`
  font-size: ${fontSizes[2]};
  color: ${grays[2]};
  margin: 0;
  margin-top: 40px;
  line-height: 1.8;
`;

export const SingleProductPrice = styled.div`
  font-size: ${fontSizes[6]};
`;

export const AddToCart = styled.button`
  height: 44px;
  border: none;
  background: ${black};
  color: ${white};
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px ${black};
  font-size: ${fontSizes[1]};
  font-family: ${montserrat};
  transition: color 200ms, background-color 200ms, stroke 200ms;
  svg {
    position: relative;
    right: 10px;
    circle {
      transition: stroke 200ms;
    }
    path {
      transition: stroke 200ms;
    }
  }
  :hover {
    background-color: ${white};
    color: ${black};
    circle {
      stroke: ${black};
    }
    path {
      stroke: ${black};
    }
  }
`;

export const Unavailable = styled.span`
  font-size: ${fontSizes[2]};
  color: ${grays[4]};
`;
