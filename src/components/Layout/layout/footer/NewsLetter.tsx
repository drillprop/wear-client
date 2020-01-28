import React from 'react';
import {
  FooterHeadings,
  FooterLongColumn,
  IconGroup,
  FooterText
} from '../Footer.styles';
import Input from '../../../Input/Input';

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
        Do you want to receive the special offers? Sign up and get 15% off
      </FooterText>
      <Input
        label='subscribe to newsletter'
        placeholder='email'
        type='email'
        icon='/mail-icon.svg'
      />
    </FooterLongColumn>
  );
};

export default NewsLetter;
