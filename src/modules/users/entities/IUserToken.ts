interface IUserToken {
  id: string;
  token: string;
  type: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export { IUserToken };
