// eslint-disable-next-line import/prefer-default-export
export const saveTokenInStorage = (email) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  const user = JSON.stringify({
    email,
  });
  localStorage.setItem('user', user);
};
