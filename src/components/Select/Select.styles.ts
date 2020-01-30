import styled, { css } from 'styled-components';
import { gray1, gray6, gray7, white } from '../../styles/colors';
import { montserrat, roboto } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';

const arrowUp = css`
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid ${gray1};
`;

const arrowDown = css`
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 10px solid ${gray1};
`;

export const SelectWrapper = styled.div`
  margin-top: 25px;
  width: 350px;
`;

export const SelectLabel = styled.div`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${fontLevel2};
  margin-bottom: 5px;
  color: ${gray1};
  display: block;
  cursor: pointer;
  text-transform: uppercase;
`;

export const StyledSelect = styled.div`
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  width: 100%;
  margin: 0;
  :focus {
    outline: 0;
  }
`;

export const SelectedOption = styled.div<{ active: boolean }>`
  position: relative;
  padding-left: 20px;
  border: 2px solid ${gray1};
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  ::after {
    content: '';
    position: absolute;
    right: 20px;
    width: 0;
    height: 0;
    ${props => (props.active ? arrowUp : arrowDown)};
  }
`;

export const PlaceHolder = styled.span`
  color: rgb(117, 117, 117);
`;

export const StyledOptions = styled.div`
  background-color: ${white};
  position: absolute;
  z-index: 5;
  width: 100%;
  border: 1px solid ${gray6};
`;

export const StyledOption = styled.div`
  padding-left: 20px;
  height: 44px;
  z-index: 5;
  display: flex;
  align-items: center;
  width: 100%;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  &:nth-of-type(even) {
    background-color: ${gray7};
  }
  :hover {
    background-color: ${gray6};
  }
`;
