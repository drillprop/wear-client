import styled from 'styled-components';
import { black, gray3 } from '../../styles/colors';
import { roboto } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';
import { SideNavItem } from '../../styles/sideNav.styles';

export const CategoryList = styled.ul`
  font-family: ${roboto};
  font-size: ${fontLevel2};
  margin-top: 20px;
  padding: 0;
  padding-left: 15px;
  color: ${gray3};
  visibility: hidden;
  height: 0;
`;

export const CategoryItem = styled.li`
  margin-top: 8px;
  :hover {
    color: ${black};
  }
`;

export const SideNavGender = styled(SideNavItem)`
  :hover {
    ul {
      visibility: visible;
      height: auto;
    }
  }
`;
