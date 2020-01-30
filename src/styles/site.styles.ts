import styled from 'styled-components';
import { gray2, gray3, gray6 } from './colors';
import { roboto } from './fonts';
import { fontLevel1 } from './fontSizes';

export const SiteWrapper = styled.div`
  display: grid;
  grid-gap: 90px;
  grid-template-columns: 280px 1fr;
`;

export const SiteForm = styled.form`
  &:first-of-type {
    margin-top: 0;
  }
  margin-top: 75px;
`;

export const SiteFormTitle = styled.h2`
  margin: 0;
  margin-top: 18px;
  position: relative;
  font-family: ${roboto};
  color: ${gray2};
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
    background-color: ${gray6};
  }
`;

export const SiteParagraph = styled.p`
  color: ${gray3};
  font-size: ${fontLevel1};
`;
