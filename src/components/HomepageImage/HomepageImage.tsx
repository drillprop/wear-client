import React from 'react';
import { Image, ImageTitle } from './HomepageImage.styles';
import Link from 'next/link';

interface Props {
  title: string;
  imageUrl: string;
}

const HomepageImage: React.FC<Props> = ({ imageUrl, title }) => {
  return (
    <Link href={title}>
      <Image imageUrl={imageUrl}>
        <ImageTitle>{title}</ImageTitle>
      </Image>
    </Link>
  );
};

export default HomepageImage;
