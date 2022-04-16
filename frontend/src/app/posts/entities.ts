export interface Post {
  id: number;
  user: {
    id: number;
    name: string;
  };
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}
