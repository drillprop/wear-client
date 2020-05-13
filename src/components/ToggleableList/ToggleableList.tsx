import React, { useState } from 'react';

interface Props {
  title: string;
}

const ToggleableList: React.FC<Props> = ({ children, title }) => {
  const [visibleList, toggleList] = useState(false);
  return (
    <li onClick={() => toggleList(!visibleList)}>
      {title}
      {visibleList && <ul>{children}</ul>}
    </li>
  );
};

export default ToggleableList;
