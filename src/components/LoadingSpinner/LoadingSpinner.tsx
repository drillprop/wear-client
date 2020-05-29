import React from 'react';
import { SpinnerWrapper } from './LoadingSpinner.styles';

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper className='loading-spinner'>
      <div />
      <div />
      <div />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
