import styled from 'styled-components';
import { grays } from './colors';
import { roboto } from './fonts';
import fontSizes from './fontSizes';

export const SiteWrapper = styled.div`
  display: grid;
  grid-gap: 50px;
  min-height: 700px;
  grid-template-columns: 150px 1fr;
  @media (max-width: 900px) {
    grid-template-columns: unset;
  }
`;

export const SiteForm = styled.form`
  &:first-of-type {
    margin-top: 0;
  }
  margin-top: 75px;
  @media (max-width: 500px) {
    width: 260px;
  }
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

export const FullPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

export const FullPageTitle = styled.h1`
  margin: 0;
  text-align: center;
  font-family: ${roboto};
  text-transform: uppercase;
  font-size: ${fontSizes[7]};
`;

export const FullPageSubTitle = styled.h3`
  max-width: 400px;
  line-height: 2;
  margin: 0;
  text-align: center;
  margin-top: 30px;
  color: ${grays[2]};
  font-size: ${fontSizes[3]};
`;
