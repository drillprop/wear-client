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

export type ContactDetailsInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['Int']>,
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
  updateContactDetails: SuccessMessage,
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
  newPassword: Scalars['String']
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


export type MutationUpdateContactDetailsArgs = {
  input: ContactDetailsInput
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

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['Int']>,
  role: UserRole,
  createdAt: Scalars['DateTime'],
  updatedAt?: Maybe<Scalars['DateTime']>,
  resetToken?: Maybe<Scalars['String']>,
  resetTokenExpiry?: Maybe<Scalars['DateTime']>,
  createdItems: Array<Maybe<Item>>,
  createdOrders: Array<Maybe<Order>>,
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

export type UpdateContactDetailsMutationVariables = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['Int']>
};


export type UpdateContactDetailsMutation = (
  { __typename?: 'Mutation' }
  & { updateContactDetails: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'address' | 'phoneNumber' | 'role' | 'createdAt' | 'updatedAt' | 'resetToken' | 'resetTokenExpiry'>
  )> }
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
export const UpdateContactDetailsDocument = gql`
    mutation UpdateContactDetails($firstName: String, $lastName: String, $address: String, $phoneNumber: Int) {
  updateContactDetails(input: {firstName: $firstName, lastName: $lastName, address: $address, phoneNumber: $phoneNumber}) {
    message
  }
}
    `;
export type UpdateContactDetailsMutationFn = ApolloReactCommon.MutationFunction<UpdateContactDetailsMutation, UpdateContactDetailsMutationVariables>;

/**
 * __useUpdateContactDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateContactDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactDetailsMutation, { data, loading, error }] = useUpdateContactDetailsMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      address: // value for 'address'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateContactDetailsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateContactDetailsMutation, UpdateContactDetailsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateContactDetailsMutation, UpdateContactDetailsMutationVariables>(UpdateContactDetailsDocument, baseOptions);
      }
export type UpdateContactDetailsMutationHookResult = ReturnType<typeof useUpdateContactDetailsMutation>;
export type UpdateContactDetailsMutationResult = ApolloReactCommon.MutationResult<UpdateContactDetailsMutation>;
export type UpdateContactDetailsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateContactDetailsMutation, UpdateContactDetailsMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    lastName
    address
    phoneNumber
    role
    createdAt
    updatedAt
    resetToken
    resetTokenExpiry
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