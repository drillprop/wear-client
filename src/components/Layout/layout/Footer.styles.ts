import styled from 'styled-components';
import { roboto } from '../../../styles/fonts';
import { fontLevel1, fontLevel2 } from '../../../styles/fontSizes';

export const FooterWrapper = styled.footer`
  margin-top: 90px;
  padding: 40px;
  display: grid;
  background-color: rgba(0, 0, 0, 0.1);
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
  font-size: ${fontLevel1};
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
  font-size: ${fontLevel2};
`;

export const FooterList = styled.ul`
  font-size: ${fontLevel1};
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
  font-size: ${fontLevel1};
  margin: 25px 0 0 0;
  line-height: 2;
`;
