import styled from 'styled-components';
import { white, grays, black } from '../../../../styles/colors';
import fontSizes from '../../../../styles/fontSizes';
import { montserrat } from '../../../../styles/fonts';

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
  padding: 20px 25px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 90px);
  height: 100%;
  ::after {
    position: absolute;
    display: flex;
    justify-self: center;
    bottom: 0;
    content: '';
    height: 1px;
    width: calc(100% - 50px);
    background-color: ${grays[5]};
  }
`;

export const CartDropdownItemImg = styled.img`
  object-fit: cover;
  width: 90px;
  height: 120px;
  margin: 0;
`;
export const CartDropdownItemInfo = styled.div`
  text-transform: none;
  letter-spacing: 0;
  font-family: ${montserrat};
  font-size: ${fontSizes[0]};
  color: ${grays[0]};
`;
export const CartDropdownItemName = styled.div`
  text-transform: uppercase;
  color: ${black};
  letter-spacing: 0;
  font-weight: 700;
`;
export const CartDropdownItemSize = styled.div`
  margin-top: 30px;
`;
export const CartDropdownItemPrice = styled.div`
  margin-top: 20px;
  font-weight: 700;
`;

export const CartDropdownItemsMore = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
  width: calc(100% - 50px);
  text-align: center;
  padding: 10px 0;
  background-color: ${grays[4]};
  color: ${white};
`;

export const CartDropdownTotalPrice = styled.div`
  font-weight: 700;
  margin-top: 20px;
  padding: 0 25px;
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
