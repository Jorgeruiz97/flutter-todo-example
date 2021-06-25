interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
}

interface JwtTokenResponse {
  access_token: string;
}