const getCurrentWeatherByCity = (city, countryCode, apiKey) => {
  const body = {};

  const options = {
    method: 'GET',
    url: `/weather?q=${city},${countryCode}&appid=${apiKey}`,
    body,
  }
  return options;
};

export default getCurrentWeatherByCity;