import getCurrentWeather from '../../support/getCurrentWeather.js'
import getCurrentWeatherByCity from '../../support/getCurrentWeatherByCity.js'

context('Open Weather API', () => {

  let apiKey;
  let testData;
  let weatherAPI;

  before(() => {
    cy.fixture('apiKey.json').then($apiKey => apiKey = $apiKey).then((apiKey) => { //loads the API Key from a fixture file (safer than having it explicit) - this value could come from another source (encrypted)
      cy.fixture('testData.json').then($testData => testData = $testData).then((testData) => { //saves the testData fixture (test file) into a testData variable to be used in the tests
        cy.request(getCurrentWeather(apiKey.value, testData.coord.lon, testData.coord.lat)).then(($weatherAPI) => weatherAPI = $weatherAPI) //saves the currentWeather API's response into weatherAPI variable. The test assertions below are made using the variable instead doing the cy.request every time
      })
    })
  });

  describe('GET Current Weather data', () => {

    it('status 200 when passing an API key (by coordinates)', () => {
      expect(weatherAPI.body.cod).to.eq(200)
    });

    it('city name and country are correct (by coordinates)', () => {
      expect(weatherAPI.body.name).to.eq(testData.name) //compares the city name from the API response with the city name from testData.json (test file)
      expect(weatherAPI.body.sys.country).to.eq(testData.sys.country)
    });

    it('correct city name when sending London`s coordinates', () => {
      const londonLon = -0.1257;
      const londonLat = 51.5085;
      cy.request(getCurrentWeather(apiKey.value, londonLon, londonLat)).then(response => {
        expect(response.body.name).to.eq('London');
      })
    });

    it('get weather info when using hour timestamp (!see comments!)', () => {
      cy.log('See comments in the code');
      /**
       * The hourly/history forecast does NOT work on my Free plan (/history/)
       * I cannot use the API below, so I cannot test the timestamps (start hour - end hour) to gather the weather info
       * However, I'm placing the code here to simulate how I'd test it!
      */
      /*
      const hourStart = 1369728000;
      const hourEnd = 1369789200;
      const dt = 1578384000; //determine a certain date
      cy.request({
        method: 'GET',
        url: `/history/city?lon=${testData.coord.lat}&lat=${testData.coord.lon}&type=hour&start=${hourStart}&end=${hourEnd}&appid=${apiKey.value}`,
      })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('weather')
          expect(response.body).to.have.nested.property('main.temp')
          expect(response.body).to.have.nested.property('main.temp_min')
          expect(response.body.dt).to.eq(dt)
          //(... assert whatever needed)
      })
      */
    });

    it('get daily aggregated weather data', () => {
      const timestampCount = 3; //returns only 3 timestamps

      cy.request({
        method: 'GET',
        url: `/forecast?lon=${testData.coord.lat}&lat=${testData.coord.lon}&cnt=${timestampCount}&appid=${apiKey.value}`
      })
        .then(response => {
          expect(response.status).to.eq(200)
          expect(response.body.cnt).to.eq(timestampCount)
          expect(response.body.list.length).to.eq(3) //asserts that list=3 because it must return only 3 timestamps
          for (let i = 0; i < response.body.list.length; i++) { //tests the properties for all 3 timestamps
            expect(response.body.list[i]).to.have.nested.property('main.temp')
            expect(response.body.list[i]).to.have.nested.property('main.temp_min')
            expect(response.body.list[i]).to.have.nested.property('main.temp_max')
            expect(response.body.list[i]).to.have.property('weather')
            expect(response.body.list[i]).to.have.property('clouds')
            expect(response.body.list[i]).to.have.property('wind')
            expect(response.body.list[i]).to.have.property('visibility')
            //(...)
          }
        })
    });

    it('get weather info by City name and Country', () => {
      const city = 'London';
      const countryCode = 'GB';
      const londonLon = -0.1257;
      const londonLat = 51.5085;
      cy.request(getCurrentWeatherByCity(city, countryCode, apiKey.value)).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq(city)
        expect(response.body.sys.country).to.eq(countryCode)
        expect(response.body.coord.lon).to.eq(londonLon)
        expect(response.body.coord.lat).to.eq(londonLat)
        expect(response.body).to.have.property('weather')
        expect(response.body).to.have.nested.property('main.temp')
        expect(response.body).to.have.nested.property('main.feels_like')
        expect(response.body).to.have.nested.property('main.temp_min')
        expect(response.body).to.have.nested.property('main.temp_max')
        expect(response.body).to.have.nested.property('main.pressure')
        expect(response.body).to.have.nested.property('main.humidity')
        
      });
    });

    describe('API schema and shape', () => {

      it('response body is an object', () => {
        assert.isObject(weatherAPI, 'value is object')
      });
  
      it('response body contains the expected properties', () => {
        expect(weatherAPI.body).to.have.property('coord')
        expect(weatherAPI.body).to.have.nested.property('coord.lon')
        expect(weatherAPI.body).to.have.nested.property('coord.lat')
        expect(weatherAPI.body).to.have.property('weather')
        expect(weatherAPI.body).to.have.property('main')
        // (...)
        expect(weatherAPI.body).to.have.property('name')
        expect(weatherAPI.body).to.have.property('cod')
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

      it('status 500 (Internal Server Error) - see comments', () => {
        
        cy.log(`I could not manage to mock error 500 and assert the status code - I'd need more time to work on this`);

        // cy.intercept('GET', `/weather?lon=${testData.coord.lon}&lat=${testData.coord.lat}&appid=${apiKey.value}`, (req) => {
        //   req.reply({
        //     statusCode: 500,
        //     forceNetworkError: true
        //   })
        // }).then((response) => {expect(response.statusCode).to.eq(500)});
      });

      it('status 429 (too many requests) - see comments', () => {
        cy.log(`A 429 error happens when a client exceeds the rate limits or has made too many requests in a short period of time.\n
              To reproduce it, I'd create a 'while' loop.\n
              While the status=200, loop. When status=429, exit the loop and assert the status code.\n
              Something like this:\n
              
              let statusCode = 200; \n
              while(statusCode === 200) { \n
                cy.request(getCurrentWeather(params)).then(response => { \n
                  if(response.status === 429) {  \n
                    statusCode = response.status; \n
                }})}`
          );
      });
    });

  })
})
