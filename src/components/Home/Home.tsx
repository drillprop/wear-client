import React from 'react';
import HomepageImage from '../HomepageImage/HomepageImage';

import { HomePageWrapper } from './Home.styles';

const Home: React.FC = () => {
  return (
    <HomePageWrapper>
      <HomepageImage title='for her' imageUrl='/woman-in-summer-fashion.jpg' />
      <HomepageImage title='for him' imageUrl='/man-looks-out-window.jpg' />
    </HomePageWrapper>
  );
};

export default Home;
