import React from 'react';
import { FooterHeadings, FooterList, FooterItem } from '../Footer.styles';

const About = () => {
  return (
    <div>
      <FooterHeadings>About</FooterHeadings>
      <FooterList>
        <FooterItem>About Wear</FooterItem>
        <FooterItem>Carriers</FooterItem>
        <FooterItem>Pressroom</FooterItem>
      </FooterList>
    </div>
  );
};

export default About;
