import React, { useState } from 'react';
import {
  Gender,
  useItemsQuery,
  ItemsQueryVariables
} from '../../generated/types';

interface Props {
  gender: Gender;
}

const Shop: React.FC<Props> = ({ gender }) => {
  const [filters, setFilters] = useState<ItemsQueryVariables>({
    whereId: null,
    take: 5,
    skip: null,
    orderBy: null,
    desc: null,
    priceFrom: null,
    priceTo: null,
    whereName: null,
    whereCategory: null,
    whereGender: gender
  });

  const { data } = useItemsQuery({
    variables: {
      ...filters
    }
  });

  console.log(data);
  return <div>this is a shop page</div>;
};

export default Shop;
