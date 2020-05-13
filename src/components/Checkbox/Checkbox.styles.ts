import styled, { css } from 'styled-components';
import { black, grays, white } from '../../styles/colors';
import { roboto } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const CheckboxWrapper = styled.div<{ marginTop?: string }>`
  display: flex;
  margin-top: ${(props) => props.marginTop};
  height: 30px;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${fontSizes[1]};
  color: ${grays[0]};
  display: block;
  cursor: pointer;
  text-transform: uppercase;
`;

export const CustomCheckboxWrapper = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
`;

const sharedCSS = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  margin-left: 100px;
  height: 30px;
  width: 30px;
  @media (max-width: 500px) {
    margin-left: 50px;
  }
`;

export const StyledCheckbox = styled.input`
  ${sharedCSS}
  opacity: 0;
  z-index: 2;
  :focus ~ span {
    outline: -webkit-focus-ring-color auto 1px;
  }
  :checked ~ span::after,
  :checked ~ span::before {
    opacity: 1;
  }
  :checked ~ span {
    background-color: ${black};
  }
`;

export const CustomCheckbox = styled.span`
  ${sharedCSS}
  border: 2px solid ${black};
  transition: background-color 200ms;
  ::after {
    opacity: 0;
    content: '';
    top: 11px;
    left: 8px;
    transform: rotate(-45deg);
    border-radius: 1px;
    position: absolute;
    width: 15px;
    height: 3px;
    background-color: ${white};
    transition: opacity 400ms;
  }
  ::before {
    opacity: 0;
    content: '';
    border-radius: 1px;
    left: 5px;
    top: 13px;
    position: absolute;
    width: 7px;
    transform: rotate(45deg);
    height: 3px;
    background-color: ${white};
    transition: opacity 400ms;
  }
`;
