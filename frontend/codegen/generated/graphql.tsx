import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Query = {
  __typename?: 'Query';
  battles?: Maybe<Array<Battle>>;
  users?: Maybe<Array<User>>;
};

export type Battle = {
  __typename?: 'Battle';
  id: Scalars['Int'];
  description: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  userName: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  battles: Array<Battle>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
};


export type MutationSignupArgs = {
  fullName: Scalars['String'];
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};



export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'userName' | 'email' | 'fullName'>
  & { battles: Array<(
    { __typename?: 'Battle' }
    & Pick<Battle, 'id' | 'description' | 'userId'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  )> }
);

export type BattlesQueryVariables = Exact<{ [key: string]: never; }>;


export type BattlesQuery = (
  { __typename?: 'Query' }
  & { battles?: Maybe<Array<(
    { __typename?: 'Battle' }
    & Pick<Battle, 'id' | 'description' | 'userId'>
  )>> }
);

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  userName
  email
  fullName
  battles {
    id
    description
    userId
  }
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
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
export const BattlesDocument = gql`
    query battles {
  battles {
    id
    description
    userId
  }
}
    `;

/**
 * __useBattlesQuery__
 *
 * To run a query within a React component, call `useBattlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBattlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBattlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BattlesQuery, BattlesQueryVariables>) {
        return ApolloReactHooks.useQuery<BattlesQuery, BattlesQueryVariables>(BattlesDocument, baseOptions);
      }
export function useBattlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BattlesQuery, BattlesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BattlesQuery, BattlesQueryVariables>(BattlesDocument, baseOptions);
        }
export type BattlesQueryHookResult = ReturnType<typeof useBattlesQuery>;
export type BattlesLazyQueryHookResult = ReturnType<typeof useBattlesLazyQuery>;
export type BattlesQueryResult = ApolloReactCommon.QueryResult<BattlesQuery, BattlesQueryVariables>;