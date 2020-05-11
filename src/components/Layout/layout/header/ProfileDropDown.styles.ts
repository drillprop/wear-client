import styled from 'styled-components';
import { grays, white } from '../../../../styles/colors';
import { Li } from '../Header.styles';

export const LiWithDropdown = styled(Li)`
  position: relative;
  :hover div {
    display: block;
  }
`;

export const ProfileDropDownWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: ${white};
  width: 100%;
`;

export const ProfileDropDownList = styled.ul`
  margin: 0;
  padding: 0;
  :last-child {
    cursor: pointer;
  }
`;

export const ProfileDropDownItem = styled.li<{ admin?: boolean }>`
  :first-child {
    padding-top: 40px;
  }
  padding-left: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  ${(props) => props.admin && `background-color: ${grays[6]}`};
`;
