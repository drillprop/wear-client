import styled from 'styled-components';

export const UsersFiltersWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-column-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: end;
`;
