import React from 'react';
import { SignHeroWrapper, HeroImage } from './SignHero.styles';

interface Props {
  image: string;
  title?: string;
  text?: string;
}

const SignHero: React.FC<Props> = ({ image, children }) => {
  return (
    <SignHeroWrapper>
      <HeroImage image={image} />
      {children}
    </SignHeroWrapper>
  );
};

export default SignHero;