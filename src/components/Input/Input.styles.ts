import styled from 'styled-components';
import { grays } from '../../styles/colors';
import { montserrat, roboto } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const InputWrapper = styled.div<{ marginTop: string; width: string }>`
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
`;

export const StyledLabel = styled.label<{ icon?: string; small?: boolean }>`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${props => (props.small ? fontSizes[0] : fontSizes[1])};
  color: ${props => (props.small ? grays[4] : grays[1])};
  margin-bottom: 5px;
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
    opacity: ${props => (props.small ? 0.6 : 0.9)};
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
`;

export const StyledInput = styled.input<{ small?: boolean }>`
  width: 100%;
  height: 44px;
  margin: 0;
  padding-left: 40px;
  border: ${props =>
    props.small ? `1px solid ${grays[6]}` : `2px solid ${grays[1]}`};
  font-size: ${props => (props.small ? fontSizes[0] : fontSizes[1])};
  font-family: ${montserrat};
`;
