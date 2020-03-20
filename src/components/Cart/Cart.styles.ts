import styled from 'styled-components';
import fontSizes from '../../styles/fontSizes';
import { grays, black } from '../../styles/colors';
import { roboto } from '../../styles/fonts';

export const CartWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  grid-gap: 50px;
`;

export const CartList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const OrderSummary = styled.section`
  margin: 0 auto;
  width: 400px;
  padding: 40px;
`;

export const OrderTitle = styled.h2`
  margin: 0;
  text-transform: uppercase;
  text-align: center;
  font-family: ${roboto};
  font-size: ${fontSizes[7]};
`;

export const Totals = styled.h3`
  font-size: ${fontSizes[2]};
  display: flex;
  color: ${grays[2]};
  justify-content: space-between;
  :first-of-type {
    margin-top: 50px;
  }
  span {
    color: ${black};
    font-size: ${fontSizes[4]};
    display: block;
  }
`;
