import React from 'react';
import { Image, ImageTitle, ImageWrapper } from './HomepageImage.styles';
import Link from 'next/link';

interface Props {
  title: string;
  imageUrl: string;
}

const HomepageImage: React.FC<Props> = ({ imageUrl, title }) => {
  return (
    <Link href={title}>
      <ImageWrapper>
        <ImageTitle>{title}</ImageTitle>
        <Image imageUrl={imageUrl}></Image>
      </ImageWrapper>
    </Link>
  );
};

export default HomepageImage;
