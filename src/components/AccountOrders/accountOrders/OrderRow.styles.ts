import styled from 'styled-components';

export const DetailsRow = styled.tr`
  @media (max-width: 900px) {
    padding: 20px;
    td {
      display: table;
      border: none;
    }
    td::before {
      display: none;
    }
  }
`;

export const DetailsHeading = styled.h3`
  margin: 0;
`;

export const DetailsColumn = styled.div`
  width: 300px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  div {
    margin-right: 20px;
  }
`;

export const DetailsWrapper = styled.div`
  margin-top: 15px;
`;
