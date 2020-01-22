import styled from 'styled-components';
import { roboto } from '../../../styles/fonts';

export const ProfileMainWrapper = styled.div`
  form:first-of-type {
    margin-top: 0;
  }
`;

export const StyledForm = styled.form`
  margin-top: 75px;
  button {
    width: 350px;
  }
  input {
    width: 350px;
  }
`;

export const StyledFormTitle = styled.h2`
  margin: 0;
  margin-top: 18px;
  position: relative;
  font-family: ${roboto};
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 30px;
  ::after {
    left: 0;
    margin-top: 40px;
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #dfdfdf;
  }
`;

export const ProfileParagraph = styled.p``;
