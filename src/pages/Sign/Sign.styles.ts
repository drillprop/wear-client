import styled from 'styled-components';

export const SignWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 290px;
  margin: 0 auto;
  input {
    margin-bottom: 25px;
  }
  button {
    margin-top: 20px;
  }
  h1 {
    margin-top: 60px;
    margin-bottom: 30px;
  }
`;

export const SignTitle = styled.h1`
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;

export const HaveAccountButton = styled.button`
  cursor: pointer;
  position: absolute;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 25px;
  background-color: white;
  border: none;
  border-radius: 100%;
  outline: none;
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transition: transform 100ms;
  transform: translate(-50%, -50%);
  :hover {
    background-color: black;
    color: white;
    transform: translate(-50%, -50%) scale(1.2);
    transition: transform 200ms;
  }
`;
