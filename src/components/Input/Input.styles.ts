import styled from 'styled-components';
import { gray1 } from '../../styles/colors';
import { montserrat, roboto } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';

export const InputWrapper = styled.div<{ marginTop: string; width: string }>`
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
`;

export const StyledLabel = styled.label<{ icon?: string }>`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${fontLevel2};
  margin-bottom: 5px;
  color: ${gray1};
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  ::before {
    content: '';
    position: absolute;
    display: block;
    margin-top: 22px;
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
  border: 2px solid ${gray1};
  width: 100%;
  height: 44px;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
`;
