export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  id: string;
  props: UserProps;

  constructor(props: UserProps, id?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = crypto.randomUUID();
    }
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set password(password: string) {
    this.props.password = password;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toLocaleString(process.env.TZ),
      updatedAt: this.updatedAt.toLocaleString(process.env.TZ),
    };
  }
}
