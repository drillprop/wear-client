import styled, { css } from 'styled-components';
import { grays, black } from './colors';
import { montserrat, roboto } from './fonts';
import fontSizes from './fontSizes';

export const Table = styled.table<{ tableColumnNames: string[] }>`
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
      min-height: 50px;
    }
    td {
      min-height: 70px;
      border: none;
      padding: 0;
      border-bottom: 1px solid ${grays[5]};
      position: relative;
      display: flex;
      align-items: center;
      word-break: break-all;
      padding-left: 50%;
    }
    td:before {
      position: absolute;
      top: 50%;
      font-weight: 700;
      transform: translateY(-50%);
      left: 10px;
      width: 45%;
      white-space: nowrap;
      font-size: ${fontSizes[0]};
      text-transform: uppercase;
      font-family: ${roboto};
      text-align: left;
      color: ${black};
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
