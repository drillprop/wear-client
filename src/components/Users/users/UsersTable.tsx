import React from 'react';
import { SiteForm, SiteFormTitle } from '../../../styles/sharedStyles';
import { StyledTable } from './UsersTable.styles';

const UsersTable = () => {
  return (
    <SiteForm>
      <SiteFormTitle>List of Users</SiteFormTitle>
      <StyledTable>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>full name</th>
            <th>role</th>
            <th>orders</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>some id</td>
            <td>some email</td>
            <td>some full name</td>
            <td>some role</td>
            <td>some orders</td>
          </tr>
          <tr>
            <td>some id</td>
            <td>some email</td>
            <td>some full name</td>
            <td>some role</td>
            <td>some orders</td>
          </tr>
          <tr>
            <td>some id</td>
            <td>some email</td>
            <td>some full name</td>
            <td>some role</td>
            <td>some orders</td>
          </tr>
        </tbody>
      </StyledTable>
    </SiteForm>
  );
};

export default UsersTable;
