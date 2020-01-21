import styled from 'styled-components';
import { roboto, montserrat } from '../../utils/fonts';
import { fontLevel2 } from '../../utils/fontSizes';

export const StyledLabel = styled.label<{ icon?: string; marginTop: string }>`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${fontLevel2};
  margin-bottom: 5px;
  margin-top: ${props => props.marginTop};
  color: #333333;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  ::before {
    content: '';
    position: absolute;
    display: block;
    margin-top: 24px;
    z-index: 1;
    width: 44px;
    height: 44px;
    opacity: 0.9;
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
`;

export const StyledInput = styled.input`
  margin: 0;
  padding-left: 40px;
  border: 2px solid #4d4d4d;
  width: 100%;
  height: 44px;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
`;
