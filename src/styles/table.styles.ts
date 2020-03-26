import styled from 'styled-components';
import { grays } from './colors';
import { montserrat, roboto } from './fonts';
import fontSizes from './fontSizes';

export const Table = styled.table`
  width: 100%;
  margin-top: 50px;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  font-size: ${fontSizes[0]};
  text-transform: uppercase;
  font-family: ${roboto};
  text-align: left;
  background-color: ${grays[0]};
  color: ${grays[5]};
`;

export const TableHeadCell = styled.th`
  padding: 30px 20px;
`;

export const TableBody = styled.tbody`
  font-size: ${fontSizes[0]};
  font-family: ${montserrat};
`;

export const TableBodyRow = styled.tr<{ grey?: boolean }>`
  cursor: pointer;
  ${props => props.grey && `background-color: ${grays[6]}`};
  :hover {
    background-color: ${grays[4]};
  }
`;

export const TableData = styled.td`
  padding: 20px;
  border: 1px solid ${grays[5]};
`;
