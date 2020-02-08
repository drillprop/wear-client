import React, { useContext } from 'react';
import { ItemsContext } from '../../contexts/Items.context';
import { useItemsQuery, useItemsCountQuery } from '../../generated/types';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsTable from './items/ItemsTable';

const Items: React.FC = () => {
  const { changePage, itemsQueryVariables } = useContext(ItemsContext);

  const { data: countData, error: countError } = useItemsCountQuery();

  const { data: itemsData, error: itemsError } = useItemsQuery({
    variables: {
      ...itemsQueryVariables
    },
    fetchPolicy: 'cache-and-network'
  });

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <CreateItemForm />
        <ItemsTable items={itemsData?.items} />
        <Pagination
          changePage={changePage}
          take={itemsQueryVariables.take}
          skip={itemsQueryVariables.skip}
          total={countData?.itemsCount}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
