const loginAPI = (email, password) => {
  const body = {
    "user": {
      "email": email,
      "password": password
    }
  };

  const options = {
    method: 'POST',
    url: `https://api.realworld.io/api/users/login`,
    body,
  }
  return options;
};

export default loginAPI;