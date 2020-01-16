import styled from 'styled-components';
import { Li } from '../Header.styles';

export const LiWithDropdown = styled(Li)`
  position: relative;
  :hover div {
    display: block;
  }
`;
