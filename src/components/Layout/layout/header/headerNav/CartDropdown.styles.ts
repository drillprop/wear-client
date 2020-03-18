import styled from 'styled-components';
import { white, grays, black } from '../../../../../styles/colors';
import fontSizes from '../../../../../styles/fontSizes';
import { montserrat } from '../../../../../styles/fonts';

export const CartDropDownWrapper = styled.div`
  position: absolute;
  right: 0;
  background-color: ${white};
`;

export const CartDropdownList = styled.ul`
  padding: 0;
`;

export const CartDropdownItem = styled.li`
  position: relative;
  :first-child {
    padding-top: 40px;
  }
  padding-left: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 90px);
  height: 100%;
  ::after {
    position: absolute;
    bottom: 0;
    content: '';
    height: 1px;
    width: 100%;
    background-color: ${grays[5]};
  }
`;

export const CartItemImg = styled.img`
  object-fit: cover;
  width: 90px;
  height: 120px;
  margin: 0;
`;
export const CartItemInfo = styled.div`
  text-transform: none;
  letter-spacing: 0;
  font-family: ${montserrat};
  font-size: ${fontSizes[0]};
  color: ${grays[0]};
`;
export const CartItemName = styled.div`
  text-transform: uppercase;
  color: ${black};
  letter-spacing: 0;
  font-weight: 700;
`;
export const CartItemSize = styled.div`
  margin-top: 30px;
`;
export const CartItemPrice = styled.div`
  margin-top: 20px;
  font-weight: 700;
`;

export const CartItemsMore = styled.div`
  position: relative;
  margin-top: 20px;
  text-align: center;
  padding: 10px 0;
  background-color: ${grays[4]};
  color: ${white};
`;

export const TotalPrice = styled.div`
  font-weight: 700;
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 90px);
`;

export const CartDropdownButton = styled.button`
  font-family: ${montserrat};
  cursor: pointer;
  font-size: ${fontSizes[1]};
  display: block;
  margin: 20px auto;
  background-color: ${black};
  border: none;
  padding: 10px 30px;
  color: ${white};
`;
