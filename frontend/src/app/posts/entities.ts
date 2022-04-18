export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
  };
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}
