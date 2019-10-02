import React from 'react';
import { Image, ImageTitle } from './HomepageImage.styles';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  imageUrl: string;
}

const HomepageImage: React.FC<Props> = ({ imageUrl, title }) => {
  return (
    <Link to={title}>
      <Image imageUrl={imageUrl}>
        <ImageTitle>{title}</ImageTitle>
      </Image>
    </Link>
  );
};

export default HomepageImage;
