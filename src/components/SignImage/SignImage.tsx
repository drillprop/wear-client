import React from 'react';
import { HeroImage } from './SignImage.styles';

interface Props {
  image: string;
  title?: string;
  text?: string;
}

const SignImage: React.FC<Props> = ({ image }) => {
  return <HeroImage image={image} />;
};

export default SignImage;
