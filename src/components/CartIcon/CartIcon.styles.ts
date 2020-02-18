import styled from 'styled-components';

interface StyledSvgProps {
  color: string;
}

export const StyledSvg = styled.svg<StyledSvgProps>`
  circle {
    stroke: ${props => props.color};
  }
  path {
    stroke: ${props => props.color};
  }
`;
