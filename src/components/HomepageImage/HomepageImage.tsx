import React from 'react';
import { Image } from './HomepageImage.styles';

interface Props {
  title: string;
  imageUrl: string;
}

const HomepageImage: React.FC<Props> = ({ imageUrl, title }) => {
  return <Image imageUrl={imageUrl} />;
};

export default HomepageImage;
