import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  margin: 20px;
  display: grid;
  position: fixed;
  z-index: 2;
  width: calc(100% - 40px);
  top: 0;
  grid-template-columns: repeat(2, 1fr);
`;

export const Logo = styled(Link)`
  font-family: 'Roboto Condensed', sans-serif;
  text-decoration: none;
  color: black;
  font-weight: 700;
  margin: 0;
  margin-left: 50px;
  font-size: 60px;
  font-style: italic;
`;

export const Navigation = styled.nav`
  display: flex;
  align-self: center;
  justify-content: space-between;
  background-color: white;
  padding: 20px;
  margin-left: 50px;
  border-radius: 5px;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  :first-of-type {
    font-weight: 700;
  }
`;

export const Li = styled.li`
  margin-right: 25px;
  text-transform: uppercase;
  svg {
    width: 15px;
    height: 15px;
    top: 0.125em;
    margin-right: 10px;
    position: relative;
  }
`;
