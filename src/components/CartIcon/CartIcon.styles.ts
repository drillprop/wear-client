import styled from 'styled-components';

interface Props {
  color: string;
}

export const CartIconSvg = styled.svg<Props>`
  circle {
    stroke: ${props => props.color};
  }
  path {
    stroke: ${props => props.color};
  }
`;
