import React from 'react';
import HomepageImage from './home/HomepageImage';

import { HomePageWrapper } from './Home.styles';

const Home: React.FC = () => {
  return (
    <HomePageWrapper>
      <HomepageImage link='shop/woman' imageUrl='/woman-in-summer-fashion.jpg'>
        for her
      </HomepageImage>
      <HomepageImage link='shop/man' imageUrl='/man-looks-out-window.jpg'>
        for him
      </HomepageImage>
    </HomePageWrapper>
  );
};

export default Home;
