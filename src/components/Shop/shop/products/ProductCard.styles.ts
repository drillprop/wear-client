import styled from 'styled-components';
import { grays } from '../../../../styles/colors';
import { roboto } from '../../../../styles/fonts';

export const ProductCardWrapper = styled.div`
  position: relative;
  width: 300px;
  max-width: 300px;
`;

export const ProductCardImg = styled.img`
  width: 300px;
  height: 400px;
  object-fit: cover;
  border: 1px solid ${grays[5]};
`;

export const ProductCardName = styled.div`
  font-family: ${roboto};
`;

export const ProductCardPrice = styled.div`
  font-family: ${roboto};
`;
