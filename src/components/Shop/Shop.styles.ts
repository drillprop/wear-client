import styled from 'styled-components';
import { grays } from '../../styles/colors';

export const ShopWrapper = styled.div`
  height: 100%;
  .loading-spinner {
    margin: 150px auto 0;
  }
`;

export const ShopFiltersWrapper = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  grid-column-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-bottom: 40px;
  ::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${grays[5]};
    bottom: -40px;
  }
`;
