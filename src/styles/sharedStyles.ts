import styled from 'styled-components';
import { roboto } from './fonts';

export const AccountSiteWrapper = styled.div`
  display: grid;
  grid-gap: 90px;
  grid-template-columns: 280px 1fr;
`;

export const AccountMain = styled.div`
  form:first-of-type {
    margin-top: 0;
  }
`;

export const AccountForm = styled.form`
  margin-top: 75px;
  button {
    width: 350px;
  }
`;

export const AccountFormTitle = styled.h2`
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

export const AccountParagraph = styled.p`
  color: #878787;
  font-size: ${fontLevel1};
`;
