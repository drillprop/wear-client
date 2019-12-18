import React from 'react';
import { FooterHeadings, FooterList, FooterItem } from '../Footer.styles';

const Help = () => {
  return (
    <div>
      <FooterHeadings>Help</FooterHeadings>
      <FooterList>
        <FooterItem>Delivery</FooterItem>
        <FooterItem>Payments</FooterItem>
        <FooterItem>Returns & Exchanges</FooterItem>
        <FooterItem>Gift Cards</FooterItem>
      </FooterList>
    </div>
  );
};

export default Help;
