import React, { useContext } from 'react';
import { ItemsContext } from '../../contexts/Items.context';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsTable from './items/ItemsTable';

const Items: React.FC = () => {
  const { variables, count, setVariables } = useContext(ItemsContext);

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <CreateItemForm />
        <ItemsTable />
        <Pagination
          total={count}
          state={variables}
          setNewState={setVariables}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
