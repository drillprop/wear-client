import styled from 'styled-components';
import { black, gray3, gray5, white } from '../../styles/colors';
import { montserrat } from '../../styles/fonts';
import {
  fontLevel2,
  fontLevel3,
  fontLevel6,
  fontLevel7
} from '../../styles/fontSizes';

export const SingleItemMain = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  gap: 40px;
`;

export const SingleItemImg = styled.img`
  height: 500px;
  max-width: 100%;
  object-fit: cover;
`;

export const SingleItemInfo = styled.section`
  position: relative;
  display: grid;
  align-items: start;
  height: 500px;
`;

export const SingleItemEdit = styled.span`
  position: absolute;
  color: ${gray5};
  font-size: ${fontLevel2};
`;

export const SingleItemName = styled.h1`
  font-size: ${fontLevel6};
  margin: 0;
  align-self: end;
  text-transform: uppercase;
`;
export const SingleItemDescription = styled.p`
  font-size: ${fontLevel3};
  color: ${gray3};
  margin: 0;
  margin-top: 40px;
  line-height: 1.8;
`;

export const SingleItemPrice = styled.div`
  font-size: ${fontLevel7};
`;

export const AddToCart = styled.button`
  height: 44px;
  border: none;
  background: ${black};
  color: ${white};
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px ${black};
  font-size: ${fontLevel2};
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
