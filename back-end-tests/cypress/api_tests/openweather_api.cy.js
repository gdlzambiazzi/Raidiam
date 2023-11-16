import getCurrentWeather from '../support/getCurrentWeather.js'

context('Open Weather API', () => {

  let apiKey;
  let city;
  let weatherAPI; 

  before(() => {
    cy.fixture('api_key.json').then($apiKey => apiKey = $apiKey).then((apiKey) => { //loads the API Key from a fixture file (safer than having it explicit) - this value could come from another source (encrypted)
      cy.fixture('cities.json').then($city => city = $city).then((city) => { //saves the city fixture (test file) into a city variable to be used in the tests
        cy.request(getCurrentWeather(apiKey.value, city.coord.lon, city.coord.lat)).then(($weatherAPI) => weatherAPI = $weatherAPI) //saves the currentWeather API's response into weatherAPI variable. The test assertions below are made using the variable instead doing the cy.request every time
      })
    })
  });

  describe('GET Current Weather data based on Lat and Long', () => {

    describe('API schema and shape', () => {

      it('response body is an object', () => {
        assert.isObject(weatherAPI, 'value is object')
      });
  
      it('response body contains the expected properties', () => {
        const responseBody = weatherAPI.body; //facilitates readability below
        expect(responseBody).to.have.property('coord')
        expect(responseBody).to.have.nested.property('coord.lon')
        expect(responseBody).to.have.nested.property('coord.lat')
        expect(responseBody).to.have.property('weather')
        expect(responseBody).to.have.property('main')
        // (...)
        expect(responseBody).to.have.property('name')
        expect(responseBody).to.have.property('cod')
      });
    });

    it('status 200 when passing an API key', () => {
      expect(weatherAPI.body.cod).to.eq(200)
    });

    it('status 401 and error message when not passing an API Key', () => {
      cy.request({
        method: 'GET',
        url: `/weather?lon=${city.coord.lon}&lat=${city.coord.lat}&appid=`,
        failOnStatusCode: false
      })
        .should((response) => {
          expect(response.status).to.eq(401)
          expect(response.body.message).to.contain('Invalid API key')
      })
    });

    it('city name is correct', () => {
      expect(weatherAPI.body.name).to.eq(city.name); //compares the city name from the API response with the city name from cities.json (test file)
    });

  })
})
