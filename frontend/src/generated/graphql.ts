import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeTz: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
  user_id: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  body: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  created_at: Scalars['DateTimeTz'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updated_at: Scalars['DateTimeTz'];
  user: User;
};

/** A paginated list of Post items. */
export type PostPaginator = {
  __typename?: 'PostPaginator';
  /** A list of Post items. */
  data: Array<Post>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts?: Maybe<PostPaginator>;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users?: Maybe<UserPaginator>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

/** Account of a person who utilizes this application. */
export type User = {
  __typename?: 'User';
  /** When the account was created. */
  created_at: Scalars['DateTimeTz'];
  /** Unique email address. */
  email: Scalars['String'];
  /** When the email was verified. */
  email_verified_at?: Maybe<Scalars['DateTimeTz']>;
  /** Unique primary key. */
  id: Scalars['ID'];
  /** Non-unique name. */
  name: Scalars['String'];
  posts: Array<Post>;
  /** When the account was last updated. */
  updated_at: Scalars['DateTimeTz'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, title: string, body: string, created_at: any, updated_at: any, user: { __typename?: 'User', id: string, name: string } } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: string, title: string, body: string, created_at: any, updated_at: any, user: { __typename?: 'User', id: string, name: string } } | null };

export type PostFragment = { __typename?: 'Post', id: string, title: string, body: string, created_at: any, updated_at: any, user: { __typename?: 'User', id: string, name: string } };

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, body: string, created_at: any, updated_at: any, user: { __typename?: 'User', id: string, name: string } } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostPaginator', data: Array<{ __typename?: 'Post', id: string, title: string, body: string, created_at: any, updated_at: any, user: { __typename?: 'User', id: string, name: string } }> } | null };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: string, title: string, body: string, created_at: any, updated_at: any, user: { __typename?: 'User', id: string, name: string } } | null };

export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  title
  body
  user {
    id
    name
  }
  created_at
  updated_at
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $body: String!) {
  createPost(user_id: 1, title: $title, body: $body) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePostGQL extends Apollo.Mutation<CreatePostMutation, CreatePostMutationVariables> {
    document = CreatePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePostGQL extends Apollo.Mutation<DeletePostMutation, DeletePostMutationVariables> {
    document = DeletePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostDocument = gql`
    query Post($id: ID!) {
  post(id: $id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PostGQL extends Apollo.Query<PostQuery, PostQueryVariables> {
    document = PostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostsDocument = gql`
    query Posts {
  posts(first: 5) {
    data {
      ...Post
    }
  }
}
    ${PostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PostsGQL extends Apollo.Query<PostsQuery, PostsQueryVariables> {
    document = PostsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
  updatePost(id: $id, title: $title, body: $body) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePostGQL extends Apollo.Mutation<UpdatePostMutation, UpdatePostMutationVariables> {
    document = UpdatePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }