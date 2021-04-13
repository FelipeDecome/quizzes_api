type TUserTokenType = 'email_confirmation' | 'reset_password';

interface ICreateUserTokenDTO {
  user_id: string;
  type: TUserTokenType;
}

export { ICreateUserTokenDTO };
