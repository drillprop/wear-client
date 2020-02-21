import styled from 'styled-components';
import { gray1, gray6, gray7, white } from '../../../../styles/colors';
import { montserrat, roboto } from '../../../../styles/fonts';
import { fontLevel2 } from '../../../../styles/fontSizes';

interface FileInputLabelProps {
  highlight?: boolean;
  outline: boolean;
}

export const UploadImageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 600px;
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

export const ImageBox = styled.div<{ imageUrl?: string }>`
  position: relative;
  width: 350px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${gray6};
  background-color: ${gray7};
  background-position: center;
  background-size: cover;
  ${props => props.imageUrl && `background-image: url(${props.imageUrl});`};
`;

export const FileInputLabel = styled.label<FileInputLabelProps>`
  height: 44px;
  width: 250px;
  background-color: ${white};
  border: 1px solid ${gray6};
  font-family: ${montserrat};
  font-weight: 500;
  font-size: ${fontLevel2};
  color: ${props => (props.highlight ? gray1 : '#757575')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${props => props.outline && 'outline: -webkit-focus-ring-color auto 1px'};
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

export const DiscardImageButton = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  top: 20px;
  right: 20px;
  border: 1px solid ${gray6};
  border-radius: 100%;
  width: 30px;
  height: 30px;
  background-color: ${white};
  ::before,
  ::after {
    position: absolute;
    content: '';
    width: 13px;
    height: 1px;
    background-color: ${gray1};
  }
  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`;
