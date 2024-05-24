export type UserData = {
  password: string;
  name: string;
  role?: string;
  email: string;
  profile: { bio: string; age: number; photoUrl?: string };
};
