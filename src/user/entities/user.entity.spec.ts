import { User, UserProps } from './user.entity';

describe('User Entity', () => {
  it('create entity', () => {
    const userProps: UserProps = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = new User(userProps);

    expect(user).toBeDefined();
    expect(user.name).toBe(userProps.name);
    expect(user.email).toBe(userProps.email);
    expect(user.password).toBe(userProps.password);
    expect(user.createdAt).toBe(userProps.createdAt);
    expect(user.updatedAt).toBe(userProps.updatedAt);
  });

  it('update name entity', () => {
    const userProps: UserProps = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = new User(userProps);

    const newName = 'Jane Doe II';

    user.name = newName;

    expect(user.name).toBe(newName);
  });
  it('update password entity', () => {
    const userProps: UserProps = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = new User(userProps);

    const newPassword = '654321';

    user.password = newPassword;

    expect(user.password).toBe(newPassword);
  });
});
