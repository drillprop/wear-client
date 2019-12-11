import styled from 'styled-components';

export const SignWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 290px;
  margin: 0 auto;
  input {
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
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
