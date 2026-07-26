import styled from "styled-components";
import { grays } from "../../styles/colors";
import fontSizes from "../../styles/fontSizes";
import { roboto } from "../../styles/fonts";

export const NoItemsWrapper = styled.div`
  margin-top: 200px;
  text-align: center;
  h3 {
    font-weight: normal;
    font-family: ${roboto};
    font-size: ${fontSizes[5]};
    color: ${grays[3]};
    text-transform: uppercase;
  }
`;
