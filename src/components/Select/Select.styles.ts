import styled, { css } from 'styled-components';
import { grays, white } from '../../styles/colors';
import { montserrat, roboto } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

const arrowUp = (small?: boolean) => css`
  ::after {
    content: '';
    position: absolute;
    right: 20px;
    top: 15px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${small ? grays[3] : grays[1]};
  }
`;

const arrowDown = (small?: boolean) => css`
  ::after {
    content: '';
    position: absolute;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${small ? grays[3] : grays[1]};
  }
`;

export const SelectWrapper = styled.div<{ marginTop: string; width: string }>`
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
`;

export const SelectLabel = styled.label<{ icon?: string; small?: boolean }>`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  margin-bottom: 5px;
  font-size: ${props => (props.small ? fontSizes[0] : fontSizes[1])};
  color: ${props => (props.small ? grays[4] : grays[1])};
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

export const CustomSelect = styled.div<{ small?: boolean }>`
  height: 44px;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  width: 100%;
  margin: 0;
  box-shadow: ${props =>
    props.small
      ? `inset 0 0 0 1px ${grays[6]};`
      : `inset 0 0 0 2px ${grays[1]}`};
  font-size: ${props => (props.small ? fontSizes[0] : fontSizes[1])};
`;

export const CustomSelectedOption = styled.div<{
  active: boolean;
  small?: boolean;
}>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  font-family: ${montserrat};
  font-size: ${props => (props.small ? fontSizes[0] : fontSizes[1])};
  padding-left: 40px;
  width: 100%;
  ${props => (props.active ? arrowUp(props.small) : arrowDown(props.small))};
`;

export const PlaceHolder = styled.span`
  text-transform: none;
  color: rgb(117, 117, 117);
`;

export const CustomOption = styled.div<{ highlight: boolean; small?: boolean }>`
  border-left: 1px solid ${grays[6]};
  border-right: 1px solid ${grays[6]};
  border-top: none;
  background-color: ${white};
  position: relative;
  padding-left: 20px;
  height: 44px;
  z-index: 5;
  display: flex;
  align-items: center;
  width: calc(100%);
  font-family: ${montserrat};
  font-size: ${props => (props.small ? fontSizes[0] : fontSizes[1])};
  &:nth-of-type(odd) {
    background-color: ${grays[8]};
    ${props => props.highlight && `background-color: ${grays[6]};`};
  }
  :hover {
    background-color: ${grays[6]};
  }
  :last-of-type {
    border-bottom: 1px solid ${grays[6]};
  }
  ${props => props.highlight && `background-color: ${grays[6]};`};
`;
