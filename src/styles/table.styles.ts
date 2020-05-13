import styled, { css } from 'styled-components';
import { grays } from './colors';
import { montserrat, roboto } from './fonts';
import fontSizes from './fontSizes';

export const Table = styled.table<{ tableColumnNames?: string[] }>`
  width: 100%;
  margin-top: 50px;
  border-collapse: collapse;
  @media (max-width: 900px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      border: 1px solid #ccc;
    }
    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
    }
    td:before {
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 20px;
      width: 45%;
      white-space: nowrap;
      font-size: ${fontSizes[0]};
      text-transform: uppercase;
      font-family: ${roboto};
      text-align: left;
      background-color: ${grays[0]};
      color: ${grays[5]};
    }
    ${(props) =>
      props.tableColumnNames &&
      props.tableColumnNames.map(
        (title, idx) => css`
            td:nth-of-type(${idx + 1}):before {
              content: '${title}';
            }`
      )};
  }
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
  ${(props) => props.grey && `background-color: ${grays[6]}`};
  :hover {
    background-color: ${grays[4]};
  }
`;

export const TableData = styled.td`
  padding: 20px;
  border: 1px solid ${grays[5]};
`;
