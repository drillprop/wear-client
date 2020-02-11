import React, { useContext } from 'react';
import { ItemsContext } from '../../contexts/Items.context';
import { useItemsCountQuery } from '../../generated/types';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsTable from './items/ItemsTable';

const Items: React.FC = () => {
  const { changePage, variables } = useContext(ItemsContext);

  const { data: countData, error: countError } = useItemsCountQuery();

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <CreateItemForm />
        <ItemsTable />
        <Pagination
          changePage={changePage}
          take={variables.take || 5}
          skip={variables.skip || 0}
          total={countData?.itemsCount}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
