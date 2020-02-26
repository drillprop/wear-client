import styled from 'styled-components';
import { grays, black } from '../../../../styles/colors';
import { roboto } from '../../../../styles/fonts';
import fontSizes from '../../../../styles/fontSizes';

export const ProductCardWrapper = styled.div`
  position: relative;
  width: 300px;
  max-width: 300px;
  :hover div {
    opacity: 1;
  }
  :hover img {
    transform: scale(1.01);
  }
`;

export const ProductCardImg = styled.img`
  width: 300px;
  max-width: 300px;
  height: 390px;
  object-fit: cover;
  border: 1px solid ${grays[4]};
  position: relative;
  transition: transform 300ms, opacity 300ms;
`;
export const ProductNameAndPrice = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  background-color: white;
  width: 100%;
`;

export const ProductName = styled.div`
  opacity: 0.8;
  transition: opacity 300ms;
  font-family: ${roboto};
  font-size: ${fontSizes[2]};
  color: ${black};
`;

export const ProductPrice = styled.div`
  font-family: ${roboto};
  font-size: ${fontSizes[2]};
  color: ${black};
`;
