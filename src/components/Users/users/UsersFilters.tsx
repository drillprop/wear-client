import React from 'react';
import { UsersQueryVariables } from '../../../generated/types';
import { UserRoleArr } from '../../../utils/constants';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import { UsersFiltersWrapper } from './UsersFilters.styles';

interface Props {
  variables: UsersQueryVariables;
  refetch: any;
}

const UsersFilters: React.FC<Props> = ({ variables, refetch }) => {
  return (
    <UsersFiltersWrapper>
      <Input
        label='search user by email'
        name='email'
        placeholder='search'
        type='search'
        icon='/search-icon.svg'
        small
        value={variables.email as string}
        onChange={(e) =>
          refetch({
            ...variables,
            email: e.target.value,
          })
        }
      />
      <Select
        label='role'
        value={variables.role}
        onChange={(role) => refetch({ ...variables, role })}
        placeHolder='role'
        options={UserRoleArr}
        small
      />
      <Select
        label='users per page'
        onChange={(take) =>
          take && refetch({ ...variables, take: parseInt(take) })
        }
        placeHolder='5'
        value={variables.take}
        options={[5, 10, 15, 20, 25]}
        small
      />
    </UsersFiltersWrapper>
  );
};

export default UsersFilters;
