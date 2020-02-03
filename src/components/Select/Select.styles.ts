import styled, { css } from 'styled-components';
import { gray1, gray6, gray8, white } from '../../styles/colors';
import { montserrat, roboto } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';

const arrowUp = css`
  ::after {
    content: '';
    position: absolute;
    right: 20px;
    top: 15px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${gray1};
  }
  ::before {
    content: '';
    position: absolute;
    z-index: 3;
    right: 20px;
    top: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${white};
  }
`;

const arrowDown = css`
  ::after {
    content: '';
    position: absolute;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${gray1};
  }
  ::before {
    content: '';
    position: absolute;
    z-index: 3;
    top: 10px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${white};
  }
`;

export const SelectWrapper = styled.div<{ marginTop: string; width: string }>`
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
`;

export const SelectLabel = styled.label<{ icon?: string }>`
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

export const CustomSelect = styled.div`
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  width: 100%;
  margin: 0;
  :focus {
    outline: 0;
  }
`;

export const CustomSelectedOption = styled.div<{ active: boolean }>`
  position: relative;
  padding-left: 40px;
  border: 2px solid ${gray1};
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  ${props => (props.active ? arrowUp : arrowDown)};
`;

export const PlaceHolder = styled.span`
  text-transform: none;
  color: rgb(117, 117, 117);
`;

export const CustomOptionsWrapper = styled.div`
  background-color: ${white};
  position: absolute;
  z-index: 5;
  width: 100%;
  border: 1px solid ${gray6};
`;

export const CustomOption = styled.div`
  padding-left: 20px;
  height: 44px;
  z-index: 5;
  display: flex;
  align-items: center;
  width: 100%;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  &:nth-of-type(even) {
    background-color: ${gray8};
  }
  :hover {
    background-color: ${gray6};
  }
`;
