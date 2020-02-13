import React, { useContext } from 'react';
import { ItemsContext } from '../../contexts/Items.context';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsTable from './items/ItemsTable';

const Items: React.FC = () => {
  const { changePage, variables, count } = useContext(ItemsContext);

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
          total={count}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
