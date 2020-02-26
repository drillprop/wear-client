import styled from 'styled-components';
import { roboto } from '../../../styles/fonts';
import fontSizes from '../../../styles/fontSizes';
import { grays } from '../../../styles/colors';

export const FooterWrapper = styled.footer`
  margin-top: 90px;
  padding: 40px;
  display: grid;
  background-color: ${grays[6]};
  grid-gap: 50px;
  grid-template-rows: 1fr auto;
`;

export const FooterTop = styled.div`
  display: grid;
  grid-gap: 70px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  padding: 0 50px;
  text-align: center;
`;

export const FooterBottom = styled.div`
  margin: 0 140px;
  padding-top: 20px;
  border-top: 1px solid grey;
  font-size: ${fontSizes[0]};
  text-align: center;
`;

export const FooterLongColumn = styled.div`
  label {
    text-align: left;
    margin-top: 25px;
  }
  input {
    text-align: left;
  }
`;

export const IconGroup = styled.div`
  margin: 25px auto 0;
  max-width: 250px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-items: center;
  img {
    width: 40px;
  }
`;

export const FooterHeadings = styled.h4`
  margin: 0;
  text-transform: uppercase;
  font-family: ${roboto};
  font-size: ${fontSizes[1]};
`;

export const FooterList = styled.ul`
  font-size: ${fontSizes[0]};
  padding: 0;
  margin: 25px auto 0;
`;

export const FooterItem = styled.li`
  cursor: pointer;
  margin-top: 10px;
  :hover {
    text-decoration: underline;
  }
`;

export const FooterText = styled.p`
  font-size: ${fontSizes[0]};
  margin: 25px 0 0 0;
  line-height: 2;
`;
