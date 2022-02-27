/* eslint-disable prettier/prettier */

//return data user
export const getUserID = () => {
  const userStr = sessionStorage.getItem('user_id')

  if(userStr) return JSON.parse(userStr)
  else return null
}

export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user_id');
}

export const setUserSession = (token, user_id) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user_id', JSON.stringify(user_id));
  console.log(getToken())
}
