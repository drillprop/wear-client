import styled from 'styled-components';
import { grays } from './colors';
import { roboto } from './fonts';
import fontSizes from './fontSizes';

export const SiteWrapper = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 150px 1fr;
`;

export const SiteForm = styled.form`
  &:first-of-type {
    margin-top: 0;
  }
  margin-top: 75px;
`;

export const SiteSubtitle = styled.h2`
  margin: 0;
  margin-top: 18px;
  position: relative;
  font-family: ${roboto};
  color: ${grays[1]};
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${fontSizes[5]};
  margin-bottom: 30px;
  ::after {
    left: 0;
    margin-top: 40px;
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${grays[5]};
  }
`;

export const SiteParagraph = styled.p`
  color: ${grays[2]};
  font-size: ${fontSizes[0]};
`;
