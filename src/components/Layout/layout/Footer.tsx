import React, { FC } from 'react';
import { FooterBottom, FooterTop, FooterWrapper } from './Footer.styles';
import About from './footer/About';
import NewsLetter from './footer/NewsLetter';
import Help from './footer/Help';
import Contact from './footer/Contact';

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <FooterTop>
        <Help />
        <About />
        <Contact />
        <NewsLetter />
      </FooterTop>
      <FooterBottom>&copy; Copyright 2019 </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
