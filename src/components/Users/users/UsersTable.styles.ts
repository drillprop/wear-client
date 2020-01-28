import styled from 'styled-components';
import { roboto, montserrat } from '../../../styles/fonts';
import { fontLevel1 } from '../../../styles/fontSizes';

export const StyledTable = styled.table`
  width: 100%;
  margin-top: 50px;
  border: 1px solid black;
  border-spacing: 0px;
  thead {
    font-size: ${fontLevel1};
    text-transform: uppercase;
    font-family: ${roboto};
    text-align: left;
    border: 1px solid black;
    background-color: black;
    color: #878787;
    th {
      padding: 30px 20px;
    }
  }
`;

export const TableBody = styled.tbody`
  font-size: ${fontLevel1};
  font-family: ${montserrat};
`;
