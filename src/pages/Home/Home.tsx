import React from 'react';
import HomepageImage from '../../components/HomepageImage/HomepageImage';
import woman from '../../assets/woman-in-summer-fashion.jpg';
import man from '../../assets/man-looks-out-window.jpg';
import { HomePageWrapper } from './Home.styles';

const Home = () => {
  return (
    <HomePageWrapper>
      <HomepageImage title='woman' imageUrl={woman} />
      <HomepageImage title='man' imageUrl={man} />
    </HomePageWrapper>
  );
};

export default Home;
