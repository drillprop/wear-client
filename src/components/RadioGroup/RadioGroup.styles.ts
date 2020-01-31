import styled from 'styled-components';
import { roboto } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';
import { gray1 } from '../../styles/colors';

interface FieldSetProps {
  marginTop: string;
  width: string;
}

export const RadioGroupFieldSet = styled.fieldset<FieldSetProps>`
  margin: 0;
  padding: 0;
  padding-left: 5px;
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
  border: 2px solid ${gray1};
  height: 66px;
`;

export const RadioGroupLegend = styled.legend`
  padding: 0;
  padding-right: 5px;
  padding-left: 5px;
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${fontLevel2};
  margin-bottom: 5px;
  color: ${gray1};
  text-transform: uppercase;
`;
