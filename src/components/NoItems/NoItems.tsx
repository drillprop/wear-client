import React from 'react';
import { NoItemsWrapper } from './NoItems.styles';

interface Props {
  text: string;
}

const NoItems: React.FC<Props> = ({ children, text }) => {
  return (
    <NoItemsWrapper>
      <h3>{text}</h3>
      {children}
    </NoItemsWrapper>
  );
};

export default NoItems;
