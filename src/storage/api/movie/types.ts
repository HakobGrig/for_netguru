export interface IMovie {
  uuid: string;
  created_at: Date;
  updated_at: Date;
  title: string;
  released: Date;
  genre: string;
  director: string;
  user_id: number;
}
