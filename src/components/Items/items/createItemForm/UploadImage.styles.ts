import styled from 'styled-components';
import { grays, white } from '../../../../styles/colors';
import { montserrat, roboto } from '../../../../styles/fonts';
import fontSizes from '../../../../styles/fontSizes';

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
  font-size: ${fontSizes[1]};
  margin-bottom: 5px;
  color: ${grays[0]};
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
  border: 1px solid ${grays[5]};
  background-color: ${grays[6]};
  background-position: center;
  background-size: cover;
  ${props => props.imageUrl && `background-image: url(${props.imageUrl});`};
`;

export const FileInputLabel = styled.label<FileInputLabelProps>`
  height: 44px;
  width: 250px;
  background-color: ${white};
  border: 1px solid ${grays[5]};
  font-family: ${montserrat};
  font-weight: 500;
  font-size: ${fontSizes[1]};
  color: ${props => (props.highlight ? grays[0] : '#757575')};
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
  border: 1px solid ${grays[5]};
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
    background-color: ${grays[0]};
  }
  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`;
