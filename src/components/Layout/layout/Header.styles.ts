import styled from 'styled-components';
import { roboto } from '../../../styles/fonts';
import fontSizes from '../../../styles/fontSizes';
import { black, white } from '../../../styles/colors';

export const HeaderWrapper = styled.header`
  padding: 0 50px;
  background-color: ${white};
  border-bottom: 1px;
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0;
  display: grid;
  grid-template-columns: 200px 1fr;
`;

export const Logo = styled.div`
  font-family: ${roboto};
  line-height: 1.5;
  text-decoration: none;
  color: ${black};
  font-weight: 700;
  margin: 0;
  font-size: ${fontSizes[9]};
  font-style: italic;
`;
