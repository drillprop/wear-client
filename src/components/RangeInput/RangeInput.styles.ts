import styled, { css } from 'styled-components';
import { black, grays } from '../../styles/colors';
import { roboto, montserrat } from '../../styles/fonts';
import { fontLevel1 } from '../../styles/fontSizes';

export const rangeTrack = css`
  height: 5px;
  background: ${grays[5]};
`;
export const rangeThumb = css`
  appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: ${black};
  margin-top: -5px;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    height: 16px;
    width: 16px;
    background-color: red;
  }
`;

interface RangeInputWrapperInterface {
  marginTop: string;
  width: string;
}

export const RangeInputWrapper = styled.div<RangeInputWrapperInterface>`
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
`;
export const RangeValueAndInput = styled.div`
  padding-left: 10px;
  display: flex;
`;

export const RangeValue = styled.input`
  font-size: ${fontLevel1};
  font-family: ${montserrat};
  border: 0;
  color: ${grays[2]};
  height: 44px;
  width: 60px;
  text-align: center;
`;

export const StyledRangeInput = styled.input`
  appearance: none;
  width: 100%;
  padding-right: 20px;
  ::-webkit-slider-runnable-track {
    ${rangeTrack}
  }
  ::-ms-track {
    ${rangeTrack}
  }
  ::-moz-range-track {
    ${rangeTrack}
  }
  ::-webkit-slider-thumb {
    ${rangeThumb}
  }
  ::-ms-thumb {
    ${rangeThumb}
  }
  ::-moz-range-thumb {
    ${rangeThumb}
  }
`;

export const RangeInputLabel = styled.label`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${fontLevel1};
  color: ${grays[4]};
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 5px;
`;
