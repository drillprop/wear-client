import styled from 'styled-components';
import fontSizes from '../../../styles/fontSizes';
import { grays } from '../../../styles/colors';

export const StyledCartItem = styled.li`
  padding: 20px 0;
  position: relative;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 110px 1fr;
  border-bottom: 1px solid ${grays[5]};
  :last-of-type {
    border-bottom: none;
  }
`;

export const CartItemImg = styled.img`
  object-fit: cover;
  width: 110px;
  height: 140px;
  margin: 0;
  border: 1px solid ${grays[5]};
`;
export const CartItemInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CartItemName = styled.h4`
  margin: 0;
  text-transform: uppercase;
  font-size: ${fontSizes[2]};
  padding-right: 10px;
`;

export const CartItemSize = styled.div`
  margin-top: 10px;
  font-size: ${fontSizes[1]};
  color: ${grays[3]};
`;

export const CartItemDelete = styled.div`
  cursor: pointer;
  font-size: ${fontSizes[3]};
  color: ${grays[3]};
`;

export const CartItemAmount = styled.div`
  margin-top: 20px;
  font-size: ${fontSizes[1]};
`;

export const Arrow = styled.span`
  cursor: pointer;
  padding: 0 10px;
`;

export const CartItemPrice = styled.div`
  font-size: ${fontSizes[3]};
  align-self: flex-end;
`;
