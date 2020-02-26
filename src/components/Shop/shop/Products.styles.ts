import styled from 'styled-components';

export const ProductsWrapper = styled.div`
  margin-top: 50px;
  display: grid;
  grid-gap: 40px 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  justify-content: space-between;
`;
