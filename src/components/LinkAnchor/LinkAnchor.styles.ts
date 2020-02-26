import styled from 'styled-components';
import { grays } from '../../styles/colors';

interface Props {
  active?: boolean;
}

export const StyledAnchor = styled.a<Props>`
  cursor: pointer;
  font-weight: ${props => (props.active ? 700 : 400)};
  color: ${props => (props.active ? grays[0] : 'inherit')};
`;
