import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 1300px;
  min-height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
export const Main = styled.main`
  margin: 100px 50px 0;
  flex: 1 0 auto;
  @media (max-width: 500px) {
    margin: 100px 25px 0;
  }
`;
