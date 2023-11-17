# Raidiam

# **Task 1:**
The Lemonade Store function is at the root of the project (lemonade-store.js).  
To execute it, simply download the js file and run it with 'node lemonade-store.js'. I'll print the test outputs on the console.  
Note: I've commented it in the code, but it's important to mention that the logic I chose to handle the bills and the changes is extremely brute-force. It is not an ideal solution for a real-world application. But it is working as expected with several different scenarios :D

# **Task 2:**
1. What are the 3 most critical flows of this application? Explain why for each one.  
  
*Answer:*  
a) Conduit home page and /articles: as it is the heart of this application, the Conduit (Global Feed) home page should always be working and displaying the articles list. Also, when clicking on an article, the /articles page should always be working too, as it's also part of the heart of the application.  
b) Sign up (/register) and sign in (/login) must also work properly, because without the sign up-sign in flow the users cannot create new articles.  
c) New article (/editor) and publishing an article must be working properly.  

2. Based on the 3 flows above, write how many test cases you consider important to ensure that these flows continue working. Feel free to write the test cases in the way that works best for you, using Gherkin, step-by-step, or any other format.  
  
*Answer:*  

(before each: logout!)
a) Feature: Conduit home page and article page  

Scenario: Conduit home page  
Given I access conduit home page  
When all the articles are loaded  
Then I can see a list of 10 articles  
And each article displays an author, a title and a description
  
Scenario: Article page  
Given I access conduit home page  
And all the articles are loaded  
When I click on the first article  
Then I am redirected to the article page  
And the article contains an author, a title and a description  
  
b) Feature: Sign up and sign in flow  

Scenario Outline: Sign up flow  
Given I access conduit home page  
And I click on Sign up link  
And I'm redirected to the register page  
And fill in the sign up form with `<username>`, '<email>' and "<password>"  
When I click on the sign up button
Then I'm redirected to the home page  
And "<username>" is successfully logged in  
  
Examples:  
| username | email          | password  |  
| user1    | user1@mail.com | password1 |  

Scenario Outline: Sign in flow  
Given I access conduit home page  
And I click on Sign in link  
And I'm redirected to the login page  
And fill in the sign in credentials with "<email>" and "<password>"  
When I click on sign in button  
Then I'm redirected to the home page  
And "<username>" is successfully logged in  

Examples:  
| username | email          | password  |  
| user1    | user1@mail.com | password1 |  

c) New article and article publishing  

Scenario outline:  
Given I am logged in as "<email>", "<password>" (use API to login)  
And I click on the New Article link  
And I'm redirected to the article editor page  
And I fill in the article "<title>", "<summary>", "<content>" and "<tags>"
When I click on Public Article button
Then my article should be published (status 200)
And I should see my article on My Articles section (/@"<username>"/)

Examples:  
| username | email          | password  | title           | summary        | content                | tags      |  
| user1    | user1@mail.com | password1 | My 1st article! | brief article  | bla bla bla bla bla... | laserTag1 |  
  
  
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
