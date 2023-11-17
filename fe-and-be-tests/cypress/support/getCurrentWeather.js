const getCurrentWeather = (apiKey, lon, lat) => {
  const body = {};

  const options = {
    method: 'GET',
    url: `/weather?lon=${lon}&lat=${lat}&appid=${apiKey}`,
    body,
  }
  return options;
};

export default getCurrentWeather;