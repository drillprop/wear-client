import styled from 'styled-components';
import { fontLevel1 } from './fontSizes';
import { roboto, montserrat } from './fonts';
import { black } from './colors';

export const Table = styled.table`
  width: 100%;
  margin-top: 50px;
  border: 1px solid ${black};
  border-spacing: 0px;
`;

export const TableHead = styled.thead`
  font-size: ${fontLevel1};
  text-transform: uppercase;
  font-family: ${roboto};
  text-align: left;
  border: 1px solid ${black};
  background-color: ${black};
  color: #878787;
`;

export const TableHeadCell = styled.th`
  padding: 30px 20px;
`;

export const TableBody = styled.tbody`
  font-size: ${fontLevel1};
  font-family: ${montserrat};
`;

export const TableBodyRow = styled.tr`
  &:nth-child(even) {
    background-color: #ededed;
  }
`;

export const TableData = styled.td`
  padding: 20px;
`;
