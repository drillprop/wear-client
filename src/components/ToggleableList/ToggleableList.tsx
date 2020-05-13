import React, { useState } from 'react';

interface Props {
  title: string;
}

const ToggleableList: React.FC<Props> = ({ children, title }) => {
  const [visibleList, toggleList] = useState(false);
  return (
    <li onClick={() => toggleList(!visibleList)}>
      <svg
        width='20px'
        height='20px'
        viewBox='0 -15 30 30'
        style={{ marginRight: '15px' }}
      >
        <path
          d={visibleList ? `M0,10 20,10 10,0` : `M0,0 20,0 10,10`}
          fill='white'
        />
      </svg>
      {title}
      {visibleList && <ul>{children}</ul>}
    </li>
  );
};

export default ToggleableList;
