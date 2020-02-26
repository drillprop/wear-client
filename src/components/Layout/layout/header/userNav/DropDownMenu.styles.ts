import styled from 'styled-components';
import { grays, white } from '../../../../../styles/colors';

export const DropDownWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: ${white};
  min-width: 110%;
`;

export const DropDownList = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 22px;
  :last-child {
    cursor: pointer;
  }
`;

export const DropDownItem = styled.li<{ admin?: boolean }>`
  padding: 20px 0 22px 22px;
  ${props => props.admin && `background-color: ${grays[6]}`};
`;
