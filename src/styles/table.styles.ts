import styled from 'styled-components';
import { black, gray6, gray8, gray7 } from './colors';
import { montserrat, roboto } from './fonts';
import { fontLevel1 } from './fontSizes';

export const Table = styled.table`
  width: 100%;
  margin-top: 50px;
  border: 1px solid ${gray6};
  border-spacing: 0px;
`;

export const TableHead = styled.thead`
  font-size: ${fontLevel1};
  text-transform: uppercase;
  font-family: ${roboto};
  text-align: left;
  background-color: ${black};
  color: ${gray6};
`;

export const TableHeadCell = styled.th`
  padding: 30px 20px;
`;

export const TableBody = styled.tbody`
  font-size: ${fontLevel1};
  font-family: ${montserrat};
`;

export const TableBodyRow = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: ${gray8};
  }
  :hover {
    background-color: ${gray7};
  }
`;

export const TableData = styled.td`
  padding: 20px;
`;
