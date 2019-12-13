import React from 'react';
import { HeroImage } from './SignImage.styles';

interface Props {
  image: string;
  title?: string;
  text?: string;
}

const SignImage: React.FC<Props> = ({ image }) => {
  return (
    <div>
      <HeroImage image={image} />
    </div>
  );
};

export default SignImage;
