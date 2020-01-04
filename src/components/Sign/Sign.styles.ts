import styled from 'styled-components';
import { roboto } from '../../utils/fonts';
import { fontLevel7 } from '../../utils/fontSizes';

export const SignWrapper = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  display: grid;
  height: calc(100vh - 90px);
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 0 auto;
  input {
    display: block;
    margin-bottom: 0;
    width: 290px;
  }
  label {
    display: block;
    margin-top: 25px;
  }
  button {
    margin-top: 50px;
  }
  h1 {
    margin-top: 60px;
    margin-bottom: 30px;
  }
  @media (max-width: 900px) {
    width: 230px;
    input {
      width: 230px;
    }
  }
`;

export const SignTitle = styled.h1`
  margin: 0;
  font-family: ${roboto};
  font-size: ${fontLevel7};
  font-weight: 700;
  text-align: center;
`;
