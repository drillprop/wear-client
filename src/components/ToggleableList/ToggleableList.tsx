import React, { useState } from 'react'

interface Props {
  title: string;
}

const ToggleAbleList: React.FC<Props> = ({ children, title }) => {
  const [visibleList, toggleList] = useState(false);
  return (
    <li onClick={() => toggleList(!visibleList)}>
      {title}
      {visibleList && children}
    </li>
  );
};

export default ToggleAbleList;
