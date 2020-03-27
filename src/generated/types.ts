import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Address = {
   __typename?: 'Address';
  id: Scalars['ID'];
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export enum Category {
  TROUSERS = 'TROUSERS',
  DRESS = 'DRESS',
  BLOUSE = 'BLOUSE',
  TSHIRT = 'TSHIRT',
  SHIRT = 'SHIRT',
  JACKET = 'JACKET',
  BLAZER = 'BLAZER',
  SWEATSHIRT = 'SWEATSHIRT'
}

export type CreateItemInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  imageUrl: Scalars['String'];
  category: Category;
  gender: Gender;
  description?: Maybe<Scalars['String']>;
  sizes?: Maybe<Array<ItemSizesInput>>;
};

export type CreateOrderInput = {
  itemId: Scalars['ID'];
  size: SizeSymbol;
};


export type EditItemInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  sizes?: Maybe<Array<ItemSizesInput>>;
};

export enum Gender {
  MAN = 'MAN',
  WOMAN = 'WOMAN'
}

export type Item = {
   __typename?: 'Item';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  imageUrl: Scalars['String'];
  category: Category;
  gender: Gender;
  description?: Maybe<Scalars['String']>;
  createdBy: User;
  sizes?: Maybe<Array<Size>>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ItemsAndCount = {
   __typename?: 'ItemsAndCount';
  select: Array<Maybe<Item>>;
  count: Scalars['Int'];
  maxPrice?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
};

export type ItemSizesInput = {
  sizeSymbol: SizeSymbol;
  quantity: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  updateAddress: SuccessMessage;
  createItem: Item;
  deleteItem: SuccessMessage;
  updateItem: Item;
  createOrder: Order;
  deleteOrder: SuccessMessage;
  manageOrder: SuccessMessage;
  changePassword: SuccessMessage;
  changeUserRole: SuccessMessage;
  deleteAccount: SuccessMessage;
  login: User;
  register: User;
  requestResetPassword: SuccessMessage;
  resetPassword: User;
  signout: SuccessMessage;
  subscribeToNewsletter: SuccessMessage;
  updatePersonalInfo: SuccessMessage;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateItemArgs = {
  input: EditItemInput;
};


export type MutationCreateOrderArgs = {
  input: Array<CreateOrderInput>;
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID'];
};


export type MutationManageOrderArgs = {
  status: OrderStatus;
  id: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type MutationChangeUserRoleArgs = {
  role: UserRole;
  email: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRequestResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  resetToken: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSubscribeToNewsletterArgs = {
  newsletter: Scalars['Boolean'];
};


export type MutationUpdatePersonalInfoArgs = {
  input: PersonalInfoInput;
};

export type Order = {
   __typename?: 'Order';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  status: OrderStatus;
  orderedBy: User;
  orderedItems: Array<Ordered_Item>;
};

export type Ordered_Item = {
   __typename?: 'Ordered_Item';
  id: Scalars['ID'];
  item: Item;
  sizeSymbol: SizeSymbol;
};

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED'
}

export type PersonalInfoInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  item?: Maybe<Item>;
  items: ItemsAndCount;
  order?: Maybe<Order>;
  orders: Array<Maybe<Order>>;
  userOrders?: Maybe<UserOrdersAndCount>;
  orderedItem?: Maybe<Ordered_Item>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users: UsersAndCount;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};


export type QueryItemsArgs = {
  where?: Maybe<SearchItemInput>;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrdersArgs = {
  where?: Maybe<SearchOrdersInput>;
};


export type QueryUserOrdersArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryOrderedItemArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  where?: Maybe<SearchUserInput>;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SearchInput = {
  id?: Maybe<Scalars['ID']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<SortOrder>;
};

export type SearchItemInput = {
  id?: Maybe<Scalars['ID']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<SortOrder>;
  priceFrom?: Maybe<Scalars['Float']>;
  priceTo?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  gender?: Maybe<Gender>;
  available?: Maybe<Scalars['Boolean']>;
};

export type SearchOrdersInput = {
  id?: Maybe<Scalars['ID']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<SortOrder>;
  status?: Maybe<OrderStatus>;
};

export type SearchUserInput = {
  id?: Maybe<Scalars['ID']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<SortOrder>;
  role?: Maybe<UserRole>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Size = {
   __typename?: 'Size';
  sizeSymbol?: Maybe<SizeSymbol>;
  quantity?: Maybe<Scalars['Int']>;
};

export enum SizeSymbol {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type SuccessMessage = {
   __typename?: 'SuccessMessage';
  message: Scalars['String'];
};

export type UpdateAddressInput = {
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  role: UserRole;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpiry?: Maybe<Scalars['DateTime']>;
  newsletter?: Maybe<Scalars['Boolean']>;
  createdItems: Array<Maybe<Item>>;
  createdOrders: Array<Maybe<Order>>;
  address?: Maybe<Address>;
};

export type UserOrdersAndCount = {
   __typename?: 'UserOrdersAndCount';
  select: Array<Maybe<Order>>;
  count: Scalars['Int'];
};

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER'
}

export type UsersAndCount = {
   __typename?: 'UsersAndCount';
  select: Array<Maybe<User>>;
  count: Scalars['Int'];
};

export type ChangePasswordMutationVariables = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type CreateItemMutationVariables = {
  name: Scalars['String'];
  price: Scalars['Float'];
  imageUrl: Scalars['String'];
  category: Category;
  gender: Gender;
  description?: Maybe<Scalars['String']>;
  sizes?: Maybe<Array<ItemSizesInput>>;
};


export type CreateItemMutation = (
  { __typename?: 'Mutation' }
  & { createItem: (
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'name' | 'price' | 'imageUrl' | 'category' | 'gender' | 'createdAt'>
    & { sizes?: Maybe<Array<(
      { __typename?: 'Size' }
      & Pick<Size, 'sizeSymbol' | 'quantity'>
    )>> }
  ) }
);

export type DeleteAccountMutationVariables = {
  password: Scalars['String'];
};


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteAccount: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type DeleteItemMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteItemMutation = (
  { __typename?: 'Mutation' }
  & { deleteItem: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
  ) }
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
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

export type SubscribeToNewsletterMutationVariables = {
  newsletter: Scalars['Boolean'];
};


export type SubscribeToNewsletterMutation = (
  { __typename?: 'Mutation' }
  & { subscribeToNewsletter: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type UpdateAddressMutationVariables = {
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};


export type UpdateAddressMutation = (
  { __typename?: 'Mutation' }
  & { updateAddress: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type UpdateItemMutationVariables = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  sizes?: Maybe<Array<ItemSizesInput>>;
};


export type UpdateItemMutation = (
  { __typename?: 'Mutation' }
  & { updateItem: (
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'name' | 'price' | 'imageUrl' | 'category' | 'gender' | 'createdAt'>
    & { sizes?: Maybe<Array<(
      { __typename?: 'Size' }
      & Pick<Size, 'sizeSymbol' | 'quantity'>
    )>> }
  ) }
);

export type UpdatePersonalInfoMutationVariables = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};


export type UpdatePersonalInfoMutation = (
  { __typename?: 'Mutation' }
  & { updatePersonalInfo: (
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  ) }
);

export type ItemsQueryVariables = {
  id?: Maybe<Scalars['ID']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<SortOrder>;
  priceFrom?: Maybe<Scalars['Float']>;
  priceTo?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  gender?: Maybe<Gender>;
  available?: Maybe<Scalars['Boolean']>;
};


export type ItemsQuery = (
  { __typename?: 'Query' }
  & { items: (
    { __typename?: 'ItemsAndCount' }
    & Pick<ItemsAndCount, 'maxPrice' | 'count'>
    & { select: Array<Maybe<(
      { __typename?: 'Item' }
      & Pick<Item, 'id' | 'name' | 'price' | 'imageUrl' | 'category' | 'gender' | 'createdAt' | 'updatedAt'>
      & { sizes?: Maybe<Array<(
        { __typename?: 'Size' }
        & Pick<Size, 'sizeSymbol' | 'quantity'>
      )>> }
    )>> }
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'phoneNumber' | 'role' | 'createdAt' | 'updatedAt' | 'resetToken' | 'resetTokenExpiry' | 'newsletter'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressLine1' | 'addressLine2' | 'zipCode' | 'city' | 'country'>
    )> }
  )> }
);

export type SingleItemQueryVariables = {
  id: Scalars['ID'];
};


export type SingleItemQuery = (
  { __typename?: 'Query' }
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'name' | 'description' | 'price' | 'imageUrl' | 'category' | 'gender' | 'createdAt' | 'updatedAt'>
    & { sizes?: Maybe<Array<(
      { __typename?: 'Size' }
      & Pick<Size, 'sizeSymbol' | 'quantity'>
    )>> }
  )> }
);

export type SingleUserQueryVariables = {
  id: Scalars['ID'];
};


export type SingleUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'phoneNumber' | 'role' | 'createdAt' | 'updatedAt' | 'newsletter'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'addressLine1' | 'addressLine2' | 'zipCode' | 'city' | 'country'>
    )>, createdOrders: Array<Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id'>
    )>> }
  )> }
);

export type UsersQueryVariables = {
  id?: Maybe<Scalars['ID']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<SortOrder>;
  role?: Maybe<UserRole>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UsersAndCount' }
    & Pick<UsersAndCount, 'count'>
    & { select: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'phoneNumber' | 'role'>
      & { createdOrders: Array<Maybe<(
        { __typename?: 'Order' }
        & Pick<Order, 'id'>
      )>> }
    )>> }
  ) }
);

export type UserOrdersQueryVariables = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type UserOrdersQuery = (
  { __typename?: 'Query' }
  & { userOrders?: Maybe<(
    { __typename?: 'UserOrdersAndCount' }
    & Pick<UserOrdersAndCount, 'count'>
    & { select: Array<Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id' | 'createdAt' | 'status'>
      & { orderedItems: Array<(
        { __typename?: 'Ordered_Item' }
        & Pick<Ordered_Item, 'id' | 'sizeSymbol'>
        & { item: (
          { __typename?: 'Item' }
          & Pick<Item, 'id' | 'name' | 'price'>
        ) }
      )> }
    )>> }
  )> }
);


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
export const CreateItemDocument = gql`
    mutation CreateItem($name: String!, $price: Float!, $imageUrl: String!, $category: Category!, $gender: Gender!, $description: String, $sizes: [ItemSizesInput!]) {
  createItem(input: {name: $name, price: $price, imageUrl: $imageUrl, category: $category, gender: $gender, description: $description, sizes: $sizes}) {
    id
    name
    price
    imageUrl
    category
    gender
    createdAt
    sizes {
      sizeSymbol
      quantity
    }
  }
}
    `;
export type CreateItemMutationFn = ApolloReactCommon.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      imageUrl: // value for 'imageUrl'
 *      category: // value for 'category'
 *      gender: // value for 'gender'
 *      description: // value for 'description'
 *      sizes: // value for 'sizes'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, baseOptions);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = ApolloReactCommon.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
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
export const DeleteItemDocument = gql`
    mutation DeleteItem($id: ID!) {
  deleteItem(id: $id) {
    message
  }
}
    `;
export type DeleteItemMutationFn = ApolloReactCommon.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, baseOptions);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = ApolloReactCommon.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
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
export const UpdateItemDocument = gql`
    mutation UpdateItem($id: String!, $name: String, $price: Float, $imageUrl: String, $category: Category, $sizes: [ItemSizesInput!]) {
  updateItem(input: {id: $id, name: $name, price: $price, imageUrl: $imageUrl, category: $category, sizes: $sizes}) {
    id
    name
    price
    imageUrl
    category
    gender
    createdAt
    sizes {
      sizeSymbol
      quantity
    }
  }
}
    `;
export type UpdateItemMutationFn = ApolloReactCommon.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      imageUrl: // value for 'imageUrl'
 *      category: // value for 'category'
 *      sizes: // value for 'sizes'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, baseOptions);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = ApolloReactCommon.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
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
export const ItemsDocument = gql`
    query Items($id: ID, $take: Int, $skip: Int, $sortBy: String, $sortOrder: SortOrder, $priceFrom: Float, $priceTo: Float, $name: String, $category: Category, $gender: Gender, $available: Boolean) {
  items(where: {id: $id, take: $take, skip: $skip, sortBy: $sortBy, sortOrder: $sortOrder, priceFrom: $priceFrom, priceTo: $priceTo, name: $name, category: $category, gender: $gender, available: $available}) {
    select {
      id
      name
      price
      imageUrl
      category
      gender
      createdAt
      updatedAt
      sizes {
        sizeSymbol
        quantity
      }
    }
    maxPrice
    count
  }
}
    `;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      priceFrom: // value for 'priceFrom'
 *      priceTo: // value for 'priceTo'
 *      name: // value for 'name'
 *      category: // value for 'category'
 *      gender: // value for 'gender'
 *      available: // value for 'available'
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        return ApolloReactHooks.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
      }
export function useItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = ApolloReactCommon.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const MeDocument = gql`
    query ME {
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
export const SingleItemDocument = gql`
    query SingleItem($id: ID!) {
  item(id: $id) {
    id
    name
    description
    price
    imageUrl
    category
    gender
    createdAt
    updatedAt
    sizes {
      sizeSymbol
      quantity
    }
  }
}
    `;

/**
 * __useSingleItemQuery__
 *
 * To run a query within a React component, call `useSingleItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleItemQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleItemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SingleItemQuery, SingleItemQueryVariables>) {
        return ApolloReactHooks.useQuery<SingleItemQuery, SingleItemQueryVariables>(SingleItemDocument, baseOptions);
      }
export function useSingleItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SingleItemQuery, SingleItemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SingleItemQuery, SingleItemQueryVariables>(SingleItemDocument, baseOptions);
        }
export type SingleItemQueryHookResult = ReturnType<typeof useSingleItemQuery>;
export type SingleItemLazyQueryHookResult = ReturnType<typeof useSingleItemLazyQuery>;
export type SingleItemQueryResult = ApolloReactCommon.QueryResult<SingleItemQuery, SingleItemQueryVariables>;
export const SingleUserDocument = gql`
    query SingleUser($id: ID!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    phoneNumber
    role
    createdAt
    updatedAt
    newsletter
    address {
      addressLine1
      addressLine2
      zipCode
      city
      country
    }
    createdOrders {
      id
    }
  }
}
    `;

/**
 * __useSingleUserQuery__
 *
 * To run a query within a React component, call `useSingleUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
        return ApolloReactHooks.useQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, baseOptions);
      }
export function useSingleUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, baseOptions);
        }
export type SingleUserQueryHookResult = ReturnType<typeof useSingleUserQuery>;
export type SingleUserLazyQueryHookResult = ReturnType<typeof useSingleUserLazyQuery>;
export type SingleUserQueryResult = ApolloReactCommon.QueryResult<SingleUserQuery, SingleUserQueryVariables>;
export const UsersDocument = gql`
    query Users($id: ID, $take: Int, $skip: Int, $sortBy: String, $sortOrder: SortOrder, $role: UserRole, $email: String, $firstName: String, $lastName: String) {
  users(where: {id: $id, take: $take, skip: $skip, sortBy: $sortBy, sortOrder: $sortOrder, role: $role, email: $email, firstName: $firstName, lastName: $lastName}) {
    count
    select {
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
 *      id: // value for 'id'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      role: // value for 'role'
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
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
export const UserOrdersDocument = gql`
    query UserOrders($take: Int, $skip: Int) {
  userOrders(take: $take, skip: $skip) {
    count
    select {
      id
      createdAt
      status
      orderedItems {
        id
        sizeSymbol
        item {
          id
          name
          price
        }
      }
    }
  }
}
    `;

/**
 * __useUserOrdersQuery__
 *
 * To run a query within a React component, call `useUserOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOrdersQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useUserOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserOrdersQuery, UserOrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<UserOrdersQuery, UserOrdersQueryVariables>(UserOrdersDocument, baseOptions);
      }
export function useUserOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserOrdersQuery, UserOrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserOrdersQuery, UserOrdersQueryVariables>(UserOrdersDocument, baseOptions);
        }
export type UserOrdersQueryHookResult = ReturnType<typeof useUserOrdersQuery>;
export type UserOrdersLazyQueryHookResult = ReturnType<typeof useUserOrdersLazyQuery>;
export type UserOrdersQueryResult = ApolloReactCommon.QueryResult<UserOrdersQuery, UserOrdersQueryVariables>;