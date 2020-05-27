import { NextPage } from 'next';
import React from 'react';
import { HomePageWrapper } from '../components/Home/Home.styles';
import HomepageImage from '../components/HomePageImage/HomepageImage';

const HomePage: NextPage = () => {
  return (
    <HomePageWrapper>
      <HomepageImage link='/woman' imageUrl='/woman-in-summer-fashion.jpg'>
        for her
      </HomepageImage>
      <HomepageImage link='/man' imageUrl='/man-looks-out-window.jpg'>
        for him
      </HomepageImage>
    </HomePageWrapper>
  );
};

export default HomePage;
