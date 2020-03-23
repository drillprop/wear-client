import React from 'react';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import {
  FooterHeadings,
  FooterLongColumn,
  FooterText,
  IconGroup
} from '../Footer.styles';

const NewsLetter = () => {
  return (
    <FooterLongColumn>
      <FooterHeadings>Stay connected</FooterHeadings>
      <IconGroup>
        <img src='/facebook-icon.svg' alt='facebook icon' />
        <img src='/instagram-icon.svg' alt='instagram icon' />
        <img src='/pinterest-icon.svg' alt='pinterest icon' />
      </IconGroup>
      <FooterText>
        Do you want to receive the special offers?{' '}
        <LinkAnchor href='/sign'>Sign up</LinkAnchor> and get 15% off
      </FooterText>
    </FooterLongColumn>
  );
};

export default NewsLetter;
