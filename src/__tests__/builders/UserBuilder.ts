import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

class UserBuilder {
  private readonly userDefault: ICreateUserDTO = {
    name: 'default user',
    email: 'default@example.com',
    password: 'defaultpassword',
  };

  public static aUser(): UserBuilder {
    return new UserBuilder();
  }

  public withDifferentEmail(): UserBuilder {
    this.userDefault.email = 'differentemail@example.com';
    return this;
  }

  public withWrongPassword(): UserBuilder {
    this.userDefault.password = 'wrongpassword';
    return this;
  }

  public build(): ICreateUserDTO {
    return this.userDefault;
  }
}

export { UserBuilder };
