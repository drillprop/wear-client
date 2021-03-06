import styled, { css } from 'styled-components';
import { black, white, grays } from '../../styles/colors';
import { montserrat } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const SingleProductMain = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
  gap: 40px;
`;

export const SingleProductImg = styled.img`
  height: 500px;
  width: 100%;
  object-fit: cover;
  @media (max-width: 400px) {
    height: 350px;
  }
  border: 1px solid ${grays[5]};
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
  margin-top: 50px;
  font-size: ${fontSizes[6]};
`;

export const AddToCart = styled.button`
  width: 100%;
  margin-top: 40px;
  height: 44px;
  border: none;
  background: ${props => (props.disabled ? grays[3] : black)};
  color: ${white};
  text-transform: uppercase;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  ${props => !props.disabled && `box-shadow: inset 0 0 0 2px ${black}`};
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
  ${props => !props.disabled && buttonHover};
`;
const buttonHover = css`
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
