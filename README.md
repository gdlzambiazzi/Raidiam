# Raidiam

# **Task 1:**
The Lemonade Store function is at the root of the project (lemonade-store.js).  
To execute it, simply download the js file and run it with 'node lemonade-store.js'. I'll print the test outputs on the console.  
Note: I've commented it in the code, but it's important to mention that the logic I chose to handle the bills and the changes is extremely brute-force. It is not an ideal solution for a real-world application. But it is working as expected with several different scenarios :D

# **Task 2:**
In progress  

# **Task 3:**
### **Important:** the original Open Weather API asked on the task is NOT free (https://openweathermap.org/api/one-call-3). It requires a subscription.  
I'm using the current weather API available on https://openweathermap.org/current.  
  
I chose to use Cypress and js to develop the API tests.  
  
The API test file is under /fe-be-tests/cypress/tests/api_tests/openweather_api.cy.js  
  
To run the API tests, you can clone the project locally. Make sure to have Cypress and the project dependencies installed (npm install cypress / npm install).  
You can run the API tests headless (**npm run cyr**) - (see package.json to understand the scripts) or using the Cypress interface (**npm run cyo**)  
  
The baseURL is defined on cypress.config.js (https://api.openweathermap.org/data/2.5)  

I've used 3 different API endpoints on the tests:  
1- the main API (used on the 'before' hook) - /weather - uses **coordinates** to return current weather information. I chose to store the response of this request in a variable to reuse it on several test cases ('it' statements).  
The fixture files used on the 'before' hook load test data and the API-key used on the endpoints.  
2- /weather?q=${city},${countryCode} - this API uses a city name + country code to return weather information for that location. I haven't created test data for this case because I've only used it once.  
3- /forecast - this API uses coordinates and a timestamp count to return an aggregated list of weather information for that location.  
  
  
TODO: once I'm done with Task 2, I'll create a pipeline and run the API tests there together with the e2e tests.
