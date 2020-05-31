import styled from 'styled-components';
import { grays } from '../../styles/colors';
import { montserrat, roboto } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const InputWrapper = styled.div<{ marginTop: string }>`
  margin-top: ${(props) => props.marginTop};
  width: 100%;
`;

export const StyledLabel = styled.label<{ icon?: string; small?: boolean }>`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${(props) => (props.small ? fontSizes[0] : fontSizes[1])};
  color: ${(props) => (props.small ? grays[2] : grays[0])};
  margin-bottom: 5px;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  ::before {
    content: '';
    position: absolute;
    display: block;
    margin-top: ${(props) => (props.small ? '20px' : '22px')};
    z-index: 1;
    width: ${(props) => (props.small ? '34px' : '44px')};
    height: ${(props) => (props.small ? '34px' : '44px')};
    opacity: ${(props) => (props.small ? 0.6 : 0.9)};
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: ${(props) => (props.small ? fontSizes[0] : fontSizes[1])};
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
`;

export const StyledInput = styled.input<{ small?: boolean }>`
  width: 100%;
  height: ${(props) => (props.small ? '36px' : '44px')};
  margin: 0;
  padding-left: ${(props) => (props.small ? '30px' : '40px')};
  border: ${(props) =>
    props.small ? `1px solid ${grays[5]}` : `2px solid ${grays[0]}`};
  font-size: ${(props) => (props.small ? fontSizes[0] : fontSizes[1])};
  font-family: ${montserrat};
`;
