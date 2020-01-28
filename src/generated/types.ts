import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type Address = {
   __typename?: 'Address',
  id: Scalars['ID'],
  addressLine1?: Maybe<Scalars['String']>,
  addressLine2?: Maybe<Scalars['String']>,
  zipCode?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
};

export type CreateItemInput = {
  name: Scalars['String'],
  price: Scalars['Float'],
  imageUrl: Scalars['String'],
  category: Scalars['String'],
};


export type EditItemInput = {
  id: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
  imageUrl?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
};

export type Item = {
   __typename?: 'Item',
  id: Scalars['ID'],
  name: Scalars['String'],
  price: Scalars['Float'],
  imageUrl: Scalars['String'],
  category: Scalars['String'],
  createdBy: User,
  createdAt: Scalars['DateTime'],
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  updateAddress: SuccessMessage,
  createItem: Item,
  deleteItem: SuccessMessage,
  updateItem: Item,
  createOrder: Order,
  deleteOrder: SuccessMessage,
  manageOrder: SuccessMessage,
  changePassword: SuccessMessage,
  changeUserRole: SuccessMessage,
  deleteAccount: SuccessMessage,
  login: User,
  register: User,
  requestResetPassword: SuccessMessage,
  resetPassword: User,
  signout: SuccessMessage,
  subscribeToNewsletter: SuccessMessage,
  updatePersonalInfo: SuccessMessage,
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput
};


export type MutationCreateItemArgs = {
  input: CreateItemInput
};


export type MutationDeleteItemArgs = {
  id: Scalars['String']
};


export type MutationUpdateItemArgs = {
  input: EditItemInput
};


export type MutationCreateOrderArgs = {
  input: Array<Scalars['ID']>
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID']
};


export type MutationManageOrderArgs = {
  status: OrderStatus,
  id: Scalars['ID']
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'],
  newPassword: Scalars['String'],
  confirmPassword: Scalars['String']
};


export type MutationChangeUserRoleArgs = {
  role: UserRole,
  email: Scalars['String']
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String']
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationRegisterArgs = {
  input: RegisterInput
};


export type MutationRequestResetPasswordArgs = {
  email: Scalars['String']
};


export type MutationResetPasswordArgs = {
  resetToken: Scalars['String'],
  password: Scalars['String']
};


export type MutationSubscribeToNewsletterArgs = {
  newsletter: Scalars['Boolean']
};


export type MutationUpdatePersonalInfoArgs = {
  input: PersonalInfoInput
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt?: Maybe<Scalars['DateTime']>,
  status: OrderStatus,
  orderedBy: User,
  orderedItems: Array<Item>,
};

export enum OrderStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Sent = 'SENT',
  Completed = 'COMPLETED'
}

export type PersonalInfoInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  items: Array<Maybe<Item>>,
  orders: Array<Maybe<Order>>,
  me?: Maybe<User>,
  users: Array<Maybe<User>>,
};


export type QueryItemsArgs = {
  input?: Maybe<SearchItemInput>
};


export type QueryOrdersArgs = {
  input?: Maybe<SearchOrdersInput>
};


export type QueryUsersArgs = {
  input?: Maybe<SearchUserInput>
};

export type RegisterInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type SearchInput = {
  whereId?: Maybe<Scalars['ID']>,
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['Boolean']>,
};

export type SearchItemInput = {
  whereId?: Maybe<Scalars['ID']>,
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['Boolean']>,
  priceFrom?: Maybe<Scalars['Float']>,
  priceTo?: Maybe<Scalars['Float']>,
  whereName?: Maybe<Scalars['String']>,
  whereCategory?: Maybe<Scalars['String']>,
};

export type SearchOrdersInput = {
  whereId?: Maybe<Scalars['ID']>,
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['Boolean']>,
  whereStatus?: Maybe<OrderStatus>,
};

export type SearchUserInput = {
  whereId?: Maybe<Scalars['ID']>,
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['Boolean']>,
  whereRole?: Maybe<UserRole>,
  whereEmail?: Maybe<Scalars['String']>,
  whereFirstName?: Maybe<Scalars['String']>,
  whereLastName?: Maybe<Scalars['String']>,
};

export type SuccessMessage = {
   __typename?: 'SuccessMessage',
  message: Scalars['String'],
};

export type UpdateAddressInput = {
  addressLine1?: Maybe<Scalars['String']>,
  addressLine2?: Maybe<Scalars['String']>,
  zipCode?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>,
  role: UserRole,
  createdAt: Scalars['DateTime'],
  updatedAt?: Maybe<Scalars['DateTime']>,
  resetToken?: Maybe<Scalars['String']>,
  resetTokenExpiry?: Maybe<Scalars['DateTime']>,
  newsletter?: Maybe<Scalars['Boolean']>,
  createdItems: Array<Maybe<Item>>,
  createdOrders: Array<Maybe<Order>>,
  address?: Maybe<Address>,
};

export enum UserRole {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Customer = 'CUSTOMER'
}

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
  ) }
);

export type SignoutMutationVariables = {};


export type SignoutMutation = (
  { __typename?: 'Mutation' }
  & { signout: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type UpdatePersonalInfoMutationVariables = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>
};


export type UpdatePersonalInfoMutation = (
  { __typename?: 'Mutation' }
  & { updatePersonalInfo: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type ChangePasswordMutationVariables = {
  password: Scalars['String'],
  newPassword: Scalars['String'],
  confirmPassword: Scalars['String']
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type SubscribeToNewsletterMutationVariables = {
  newsletter: Scalars['Boolean']
};


export type SubscribeToNewsletterMutation = (
  { __typename?: 'Mutation' }
  & { subscribeToNewsletter: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type DeleteAccountMutationVariables = {
  password: Scalars['String']
};


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteAccount: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type UpdateAddressMutationVariables = {
  addressLine1?: Maybe<Scalars['String']>,
  addressLine2?: Maybe<Scalars['String']>,
  zipCode?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>
};


export type UpdateAddressMutation = (
  { __typename?: 'Mutation' }
  & { updateAddress: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'phoneNumber' | 'role' | 'createdAt' | 'updatedAt' | 'resetToken' | 'resetTokenExpiry' | 'newsletter'>
    & { address: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressLine1' | 'addressLine2' | 'zipCode' | 'city' | 'country'>
    )> }
  )> }
);

export type UsersQueryVariables = {
  whereId?: Maybe<Scalars['ID']>,
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['Boolean']>,
  whereRole?: Maybe<UserRole>,
  whereEmail?: Maybe<Scalars['String']>,
  whereFirstName?: Maybe<Scalars['String']>,
  whereLastName?: Maybe<Scalars['String']>
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'phoneNumber' | 'role'>
    & { createdOrders: Array<Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id'>
    )>> }
  )>> }
);


export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(input: {email: $email, password: $password}) {
    id
    email
    firstName
    lastName
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    id
    email
    firstName
    lastName
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignoutDocument = gql`
    mutation Signout {
  signout {
    message
  }
}
    `;
export type SignoutMutationFn = ApolloReactCommon.MutationFunction<SignoutMutation, SignoutMutationVariables>;

/**
 * __useSignoutMutation__
 *
 * To run a mutation, you first call `useSignoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signoutMutation, { data, loading, error }] = useSignoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignoutMutation, SignoutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignoutMutation, SignoutMutationVariables>(SignoutDocument, baseOptions);
      }
export type SignoutMutationHookResult = ReturnType<typeof useSignoutMutation>;
export type SignoutMutationResult = ApolloReactCommon.MutationResult<SignoutMutation>;
export type SignoutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignoutMutation, SignoutMutationVariables>;
export const UpdatePersonalInfoDocument = gql`
    mutation UpdatePersonalInfo($firstName: String, $lastName: String, $phoneNumber: String) {
  updatePersonalInfo(input: {firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber}) {
    message
  }
}
    `;
export type UpdatePersonalInfoMutationFn = ApolloReactCommon.MutationFunction<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>;

/**
 * __useUpdatePersonalInfoMutation__
 *
 * To run a mutation, you first call `useUpdatePersonalInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonalInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonalInfoMutation, { data, loading, error }] = useUpdatePersonalInfoMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdatePersonalInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>(UpdatePersonalInfoDocument, baseOptions);
      }
export type UpdatePersonalInfoMutationHookResult = ReturnType<typeof useUpdatePersonalInfoMutation>;
export type UpdatePersonalInfoMutationResult = ApolloReactCommon.MutationResult<UpdatePersonalInfoMutation>;
export type UpdatePersonalInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $newPassword: String!, $confirmPassword: String!) {
  changePassword(password: $password, newPassword: $newPassword, confirmPassword: $confirmPassword) {
    message
  }
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      newPassword: // value for 'newPassword'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const SubscribeToNewsletterDocument = gql`
    mutation SubscribeToNewsletter($newsletter: Boolean!) {
  subscribeToNewsletter(newsletter: $newsletter) {
    message
  }
}
    `;
export type SubscribeToNewsletterMutationFn = ApolloReactCommon.MutationFunction<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>;

/**
 * __useSubscribeToNewsletterMutation__
 *
 * To run a mutation, you first call `useSubscribeToNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToNewsletterMutation, { data, loading, error }] = useSubscribeToNewsletterMutation({
 *   variables: {
 *      newsletter: // value for 'newsletter'
 *   },
 * });
 */
export function useSubscribeToNewsletterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>) {
        return ApolloReactHooks.useMutation<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>(SubscribeToNewsletterDocument, baseOptions);
      }
export type SubscribeToNewsletterMutationHookResult = ReturnType<typeof useSubscribeToNewsletterMutation>;
export type SubscribeToNewsletterMutationResult = ApolloReactCommon.MutationResult<SubscribeToNewsletterMutation>;
export type SubscribeToNewsletterMutationOptions = ApolloReactCommon.BaseMutationOptions<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($password: String!) {
  deleteAccount(password: $password) {
    message
  }
}
    `;
export type DeleteAccountMutationFn = ApolloReactCommon.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, baseOptions);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = ApolloReactCommon.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const UpdateAddressDocument = gql`
    mutation UpdateAddress($addressLine1: String, $addressLine2: String, $zipCode: String, $city: String, $country: String) {
  updateAddress(input: {addressLine1: $addressLine1, addressLine2: $addressLine2, zipCode: $zipCode, city: $city, country: $country}) {
    message
  }
}
    `;
export type UpdateAddressMutationFn = ApolloReactCommon.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      addressLine1: // value for 'addressLine1'
 *      addressLine2: // value for 'addressLine2'
 *      zipCode: // value for 'zipCode'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, baseOptions);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = ApolloReactCommon.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    lastName
    phoneNumber
    role
    createdAt
    updatedAt
    resetToken
    resetTokenExpiry
    newsletter
    address {
      addressLine1
      addressLine2
      zipCode
      city
      country
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users($whereId: ID, $take: Int, $skip: Int, $orderBy: String, $desc: Boolean, $whereRole: UserRole, $whereEmail: String, $whereFirstName: String, $whereLastName: String) {
  users(input: {take: $take, skip: $skip, orderBy: $orderBy, desc: $desc, whereRole: $whereRole, whereEmail: $whereEmail, whereFirstName: $whereFirstName, whereLastName: $whereLastName}) {
    id
    email
    firstName
    lastName
    phoneNumber
    role
    createdOrders {
      id
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      whereId: // value for 'whereId'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *      desc: // value for 'desc'
 *      whereRole: // value for 'whereRole'
 *      whereEmail: // value for 'whereEmail'
 *      whereFirstName: // value for 'whereFirstName'
 *      whereLastName: // value for 'whereLastName'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;