import { NextPage } from 'next';
import Head from 'next/head';
import EditItemForm from '../../../components/EditItemForm/EditItemForm';
import { UserRole, useSingleItemQuery } from '../../../generated/types';
import { withPrivateRoute } from '../../../hoc/withPrivateRoute';

interface Props {
  query: {
    item: string;
  };
}

const AdminItem: NextPage<Props> = ({ query }) => {
  const { data } = useSingleItemQuery({
    variables: {
      id: query.item,
    },
  });
  return (
    <>
      <Head>
        <title> wear | edit item</title>
      </Head>
      <EditItemForm item={data?.item} />;
    </>
  );
};

export default withPrivateRoute(AdminItem, UserRole.EMPLOYEE);
