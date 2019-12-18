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
        <img src='./facebook-icon.svg' alt='' />
        <img src='./instagram-icon.svg' alt='' />
        <img src='./pinterest-icon.svg' alt='' />
      </IconGroup>
      <FooterText>
        Do you want to receive the special offers? Sign up and get 15% off
      </FooterText>
      <Input
        label='subscribe to newsletter'
        placeholder='email'
        type='email'
        icon='./mail-icon.svg'
      />
    </FooterLongColumn>
  );
};

export default NewsLetter;
