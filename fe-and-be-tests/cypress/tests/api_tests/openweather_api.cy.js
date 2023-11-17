import getCurrentWeather from '../../support/getCurrentWeather.js'

context('Open Weather API', () => {

  let apiKey;
  let testData;
  let weatherAPI;

  before(() => {
    cy.fixture('api_key.json').then($apiKey => apiKey = $apiKey).then((apiKey) => { //loads the API Key from a fixture file (safer than having it explicit) - this value could come from another source (encrypted)
      cy.fixture('test_data.json').then($testData => testData = $testData).then((testData) => { //saves the testData fixture (test file) into a testData variable to be used in the tests
        cy.request(getCurrentWeather(apiKey.value, testData.coord.lon, testData.coord.lat)).then(($weatherAPI) => weatherAPI = $weatherAPI) //saves the currentWeather API's response into weatherAPI variable. The test assertions below are made using the variable instead doing the cy.request every time
      })
    })
  });

  describe('GET Current Weather data based on Lat and Long', () => {

    it('status 200 when passing an API key', () => {
      expect(weatherAPI.body.cod).to.eq(200)
    });

    it('city name and country are correct', () => {
      expect(weatherAPI.body.name).to.eq(testData.name); //compares the city name from the API response with the city name from testData.json (test file)
      expect(weatherAPI.body.sys.country).to.eq(testData.sys.country)
    });

    it('', () => {
      
    });

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

    describe('Error states', () => {

      it('status 401 (unauthorized) and error message when not passing an API Key', () => {
        cy.request({
          method: 'GET',
          url: `/weather?lon=${testData.coord.lon}&lat=${testData.coord.lat}&appid=`,
          failOnStatusCode: false
        })
          .should((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Invalid API key')
        })
      });

      it('status 400 (bad request) and error message when not passing a mandatory parameter', () => {
        cy.request({
          method: 'GET',
          url: `/weather?lon=&lat=${testData.coord.lat}&appid=${apiKey.value}`,
          failOnStatusCode: false
        })
          .should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.contain('Nothing to geocode')
        })
      });

      it('status 404 (not found) and error message with wrong URL', () => {
        cy.request({
          method: 'GET',
          url: `?lon=&lat=${testData.coord.lat}&appid=${apiKey.value}`,
          failOnStatusCode: false
        })
          .should((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.message).to.contain('Internal error')
        })
      });

      it('status 500 (Internal Server Error) and error message', () => {
        // need to mock error 500 and assert the status code

        // cy.intercept('GET', `/weather?lon=${testData.coord.lon}&lat=${testData.coord.lat}&appid=${apiKey.value}`, (req) => {
        //   req.reply({
        //     statusCode: 500,
        //     forceNetworkError: true
        //   })
        // }).then((response) => {expect(response.statusCode).to.eq(500)});
      });
    });

  })
})
