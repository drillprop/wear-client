import React, { useContext } from 'react';
import Input from '../../../Input/Input';
import Select from '../../../Select/Select';
import { UsersFiltersWrapper } from './UsersFilters.styles';
import { UsersContext } from '../../../../contexts/Users.context';
import { UserRole } from '../../../../generated/types';

const UsersFilters = () => {
  const { variables, setVariables } = useContext(UsersContext);
  return (
    <UsersFiltersWrapper>
      <Input
        label='search user by email'
        name='whereEmail'
        placeholder='search'
        type='search'
        icon='/search-icon.svg'
        small
        value={variables.whereEmail as string}
        onChange={e =>
          setVariables({
            ...variables,
            whereEmail: e.target.value
          })
        }
      />
      <Select
        label='role'
        value={variables.whereRole}
        onChange={whereRole => setVariables({ ...variables, whereRole })}
        placeHolder='role'
        options={Object.values(UserRole)}
        small
      />
      <Select
        label='users per page'
        onChange={take =>
          take && setVariables({ ...variables, take: parseInt(take) })
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
