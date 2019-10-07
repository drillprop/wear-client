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
  align-items: center;
  max-width: 290px;
  margin: 0 auto;
  input {
    margin-bottom: 25px;
    width: 290px;
  }
  button {
    margin-top: 20px;
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

export const HaveAccountButton = styled.button`
  cursor: pointer;
  position: absolute;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 25px;
  background-color: white;
  border: none;
  border-radius: 100%;
  padding: 20px;
  outline: none;
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transition: transform 100ms, background-color 100ms;
  transform: translate(-50%, -50%);
  :hover {
    background-color: black;
    color: white;
    transform: translate(-50%, -50%) scale(1.2);
    transition: transform 200ms, background-color 200ms;
  }
  @media (max-width: 900px) {
    position: static;
    margin: 40px auto 0;
    border-radius: 0;
    transform: translate(0, 0);
    height: auto;
    font-size: 18px;
    :hover {
      background-color: black;
      color: white;
      transform: translate(0, 0) scale(1);
      transition: transform 200ms, background-color 200ms;
    }
  }
`;
