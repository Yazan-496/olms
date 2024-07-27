export const isAuthenticated = (user: any) => {
  return !!user?.access_token;
};
