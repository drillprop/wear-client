import styled from 'styled-components';
import { gray1, gray6, gray7, white } from '../../../../styles/colors';
import { montserrat, roboto } from '../../../../styles/fonts';
import { fontLevel2 } from '../../../../styles/fontSizes';

export const UploadImageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const TopLabel = styled.label`
  margin-top: 25px;
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

export const ImageBox = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${gray6};
  background-color: ${gray7};
`;

export const FileInputLabel = styled.label`
  height: 44px;
  width: 250px;
  background-color: ${white};
  border: 1px solid ${gray6};
  font-family: ${montserrat};
  font-weight: 500;
  font-size: ${fontLevel2};
  color: #757575;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const StyledFileInput = styled.input`
  position: absolute;
  margin: 0;
  height: 44px;
  width: 250px;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
`;
