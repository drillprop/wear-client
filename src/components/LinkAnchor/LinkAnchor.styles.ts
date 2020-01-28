import styled from 'styled-components';

interface Props {
  active?: boolean;
}

export const StyledAnchor = styled.a<Props>`
  text-decoration: ${props => (props.active ? 'underline' : 'none')};
  cursor: pointer;
`;
