import styled from 'styled-components';
import { grays, black } from '../../../styles/colors';
import { roboto } from '../../../styles/fonts';
import fontSizes from '../../../styles/fontSizes';

export const ProductsWrapper = styled.div`
  margin-top: 75px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
`;

export const ProductCardWrapper = styled.div`
  position: relative;
  :hover div {
    opacity: 1;
  }
  :hover img {
    transform: scale(1.01);
  }
  @media (max-width: 500px) {
    width: 200px;
  }
`;

export const ProductCardImg = styled.img`
  height: 380px;
  width: 100%;
  object-fit: cover;
  border: 1px solid ${grays[4]};
  transition: transform 300ms, opacity 300ms;
  @media (max-width: 500px) {
    height: 270px;
  }
`;

export const ProductNameAndPrice = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
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
