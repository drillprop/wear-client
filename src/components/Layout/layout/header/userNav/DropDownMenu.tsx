import React from 'react';
import {
  DropDownWrapper,
  DropDownList,
  DropDownItem
} from './DropDownMenu.styles';

const DropDownMenu = () => {
  return (
    <DropDownWrapper>
      <DropDownList>
        <DropDownItem>my profile</DropDownItem>
        <DropDownItem>my orders</DropDownItem>
        <DropDownItem>my cart</DropDownItem>
        <DropDownItem>logout</DropDownItem>
      </DropDownList>
    </DropDownWrapper>
  );
};

export default DropDownMenu;
