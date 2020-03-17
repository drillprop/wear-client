import React from 'react';
import { Image, ImageTitle, ImageWrapper } from './HomepageImage.styles';
import Link from 'next/link';

interface Props {
  link: string;
  imageUrl: string;
}

const HomepageImage: React.FC<Props> = ({ imageUrl, link, children }) => {
  return (
    <Link href={link}>
      <ImageWrapper>
        <ImageTitle>{children}</ImageTitle>
        <Image imageUrl={imageUrl}></Image>
      </ImageWrapper>
    </Link>
  );
};

export default HomepageImage;
