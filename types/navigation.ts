export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Individual: { id: number };
  Users: undefined;
  GerenciarPost: { idPost: number };
  RegisterUser: { id: number | null };
};
