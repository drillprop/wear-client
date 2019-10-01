import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  margin: 30px 80px;
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  font-family: 'Roboto Condensed', sans-serif;
  text-decoration: none;
  color: black;
  font-weight: 700;
  margin: 0;
  font-size: 80px;
  font-style: italic;
`;

export const Navigation = styled.nav`
  display: flex;
  align-self: center;
`;

export const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  margin-left: 25px;
`;

export const Li = styled.li`
  margin-right: 25px;
`;
