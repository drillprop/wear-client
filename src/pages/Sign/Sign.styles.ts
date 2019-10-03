import styled from 'styled-components';

export const SignWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin-bottom: 50px;
  }
  button {
    margin-top: 20px;
  }
  h1 {
    margin-top: 40px;
    margin-bottom: 70px;
  }
`;

export const SignTitle = styled.h1`
  margin: 0;
  font-family: 'Roboto Condensed';
  font-size: 40px;
  font-weight: 700;
  text-align: center;
`;

export const ForgotPassword = styled.p`
  font-size: 14px;
  text-align: right;
  margin-top: -40px;
`;
