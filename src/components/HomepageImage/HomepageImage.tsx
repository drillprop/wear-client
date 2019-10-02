import React from 'react';
import { Image, ImageTitle } from './HomepageImage.styles';

interface Props {
  title: string;
  imageUrl: string;
}

const HomepageImage: React.FC<Props> = ({ imageUrl, title }) => {
  return (
    <Image imageUrl={imageUrl}>
      <ImageTitle>{title}</ImageTitle>
    </Image>
  );
};

export default HomepageImage;
