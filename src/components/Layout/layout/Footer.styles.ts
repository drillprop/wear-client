import styled from 'styled-components';
import { roboto } from '../../../utils/fonts';
import { fontLevel1, fontLevel2 } from '../../../utils/fontSizes';

export const FooterWrapper = styled.footer`
  margin-top: 90px;
  padding: 40px 0;
  display: grid;
  background-color: rgba(0, 0, 0, 0.1);
  grid-gap: 30px;
  grid-template-rows: 1fr auto;
`;

export const FooterTop = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 0 50px;
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
    margin-top: 25px;
  }
`;

export const IconGroup = styled.div`
  margin: 25px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-items: center;
  img {
    width: 35px;
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