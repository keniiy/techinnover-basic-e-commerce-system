export interface SeederOptions {
  createMultiple?: boolean;
  userCount?: number;
}

export interface SeededUser {
  email: string;
  password: string;
}
