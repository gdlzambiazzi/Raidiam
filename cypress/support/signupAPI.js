const signupAPI = (username, email, password) => {
  const body = {
    "user": {
      "email": email,
      "password": password,
      "username": username
    }
  };

  const options = {
    method: 'POST',
    url: `https://api.realworld.io/api/users`,
    body,
  }
  return options;
};

export default signupAPI;