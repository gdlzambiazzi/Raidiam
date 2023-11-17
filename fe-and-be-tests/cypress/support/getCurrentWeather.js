const getCurrentWeather = (apiKey, lon, lat, units = '') => {
  const body = {};

  const options = {
    method: 'GET',
    url: `/weather?lon=${lon}&lat=${lat}&appid=${apiKey}&units=${units}`,
    body,
  }
  return options;
};

export default getCurrentWeather;