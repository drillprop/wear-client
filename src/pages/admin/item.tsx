import { ApolloQueryResult } from 'apollo-boost';
import { NextPage } from 'next';
import { ApolloAppContext } from 'next-with-apollo';
import Head from 'next/head';
import EditItemForm from '../../components/EditItemForm/EditItemForm';
import { SingleItemQuery } from '../../generated/types';
import SINGLE_ITEM from '../../graphql/queries/SINGLE_ITEM';

interface Props {
  singleItemQuery: ApolloQueryResult<SingleItemQuery>;
}

const AdminItem: NextPage<Props> = ({ singleItemQuery }) => {
  const { data } = singleItemQuery;
  return (
    <>
      <Head>
        <title> wear | edit item</title>
      </Head>
      <EditItemForm item={data.item} />;
    </>
  );
};

AdminItem.getInitialProps = async (ctx: ApolloAppContext) => {
  const singleItemQuery = await ctx.apolloClient.query<SingleItemQuery>({
    query: SINGLE_ITEM,
    variables: ctx.query
  });
  return { singleItemQuery };
};

export default AdminItem;
