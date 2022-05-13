import { PaginatorInfo } from '../entities';

export interface PostResource {
  id: string;
  user: {
    id: string;
    name: string;
  };
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface Post extends Omit<PostResource, 'created_at' | 'updated_at'> {
  created_at: Date;
  updated_at: Date;
}

export interface Posts {
  data: Post[];
  paginatorInfo: PaginatorInfo;
}
