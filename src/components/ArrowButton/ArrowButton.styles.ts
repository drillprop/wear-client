import styled from 'styled-components';

interface Props {
  color?: string;
  direction: 'up' | 'down';
  size: number;
}

export const StyledArrow = styled.div<Props>`
  width: 0;
  height: 0;
  border-left: ${props => props.size}px solid transparent;
  border-right: ${props => props.size}px solid transparent;
  ${props =>
    props.direction === 'up' &&
    `border-bottom: ${props.size}px solid ${props.color};`};
  ${props =>
    props.direction === 'down' &&
    `border-down: ${props.size}5px solid ${props.color};`};
`;
