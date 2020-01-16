import styled from 'styled-components';

export const DropDownWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: white;
  padding-right: 22px;
  min-width: 110%;
`;

export const DropDownList = styled.ul`
  margin: 0;
  padding: 0;
  padding-bottom: 24px;
  :last-child {
    cursor: pointer;
  }
`;

export const DropDownItem = styled.li`
  margin-top: 24px;
  margin-left: 22px;
`;
