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
  battle?: Maybe<Battle>;
  battles: Array<Battle>;
  users: Array<User>;
  me?: Maybe<User>;
};


export type QueryBattleArgs = {
  id: Scalars['ID'];
};


export type QueryBattlesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<BattleWhereUniqueInput>;
  after?: Maybe<BattleWhereUniqueInput>;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<UserWhereUniqueInput>;
  after?: Maybe<UserWhereUniqueInput>;
};

export type Battle = {
  __typename?: 'Battle';
  id: Scalars['String'];
  description: Scalars['String'];
  arguments: Array<Argument>;
  userId: Scalars['String'];
};


export type BattleArgumentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ArgumentWhereUniqueInput>;
  after?: Maybe<ArgumentWhereUniqueInput>;
};

export type ArgumentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Argument = {
  __typename?: 'Argument';
  id: Scalars['String'];
  text: Scalars['String'];
  comments: Array<Comment>;
};


export type ArgumentCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CommentWhereUniqueInput>;
  after?: Maybe<CommentWhereUniqueInput>;
};

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  text: Scalars['String'];
};

export type BattleWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  userName: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  battles: Array<Battle>;
};


export type UserBattlesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<BattleWhereUniqueInput>;
  after?: Maybe<BattleWhereUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addArgument?: Maybe<Argument>;
  addComment?: Maybe<Comment>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
};


export type MutationAddArgumentArgs = {
  battleId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationAddCommentArgs = {
  argumentId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  fullName: Scalars['String'];
  userName: Scalars['String'];
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
  & { battles: Array<(
    { __typename?: 'Battle' }
    & Pick<Battle, 'id' | 'description' | 'userId'>
  )> }
);

export type BattleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BattleQuery = (
  { __typename?: 'Query' }
  & { battle?: Maybe<(
    { __typename?: 'Battle' }
    & Pick<Battle, 'id' | 'description' | 'userId'>
  )> }
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
export const BattleDocument = gql`
    query battle($id: ID!) {
  battle(id: $id) {
    id
    description
    userId
  }
}
    `;

/**
 * __useBattleQuery__
 *
 * To run a query within a React component, call `useBattleQuery` and pass it any options that fit your needs.
 * When your component renders, `useBattleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBattleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BattleQuery, BattleQueryVariables>) {
        return ApolloReactHooks.useQuery<BattleQuery, BattleQueryVariables>(BattleDocument, baseOptions);
      }
export function useBattleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BattleQuery, BattleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BattleQuery, BattleQueryVariables>(BattleDocument, baseOptions);
        }
export type BattleQueryHookResult = ReturnType<typeof useBattleQuery>;
export type BattleLazyQueryHookResult = ReturnType<typeof useBattleLazyQuery>;
export type BattleQueryResult = ApolloReactCommon.QueryResult<BattleQuery, BattleQueryVariables>;