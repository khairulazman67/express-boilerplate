export interface responseLogin {
  user: {
    id: number;
    email: String;
    role?: String;
  };
  refresh_token: String;
  access_token: String;
}
