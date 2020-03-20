import styled from 'styled-components';
import { roboto } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const SignWrapper = styled.div`
  max-width: 1300px;
  display: grid;
  height: calc(100vh - 100px);
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 290px;
  @media (max-width: 900px) {
    width: 230px;
  }
`;

export const SignTitle = styled.h1`
  margin: 0;
  margin-top: 60px;
  font-family: ${roboto};
  font-size: ${fontSizes[6]};
  font-weight: 700;
  text-align: center;
`;
