# Raidiam

# **Task 1:**
The Lemonade Store function is at the root of the project (lemonade-store.js).  
To execute it, simply download the js file and run it with 'node lemonade-store.js'. It'll print the test outputs on the console.  
Note: I've commented it in the code, but it's important to mention that the logic I chose to handle the bills and the changes is extremely brute-force. It is not an ideal solution for a real-world application. But it is working as expected with several different scenarios :D

# **Task 2:**
1. What are the 3 most critical flows of this application? Explain why for each one.  
  
*Answer:*  
a) Conduit home page and /articles: as it is the heart of this application, the Conduit (Global Feed) home page should always be working and displaying the articles list. Also, when clicking on an article, the /articles page should always be working too, as it's also part of the heart of the application.  
b) Sign up (/register) and sign in (/login) must also work properly, because without the sign up-sign in flow the users cannot create new articles.  
c) New article (/editor) and publishing an article must be working properly.  

2. Based on the 3 flows above, write how many test cases you consider important to ensure that these flows continue working. Feel free to write the test cases in the way that works best for you, using Gherkin, step-by-step, or any other format.  
  
*Answer:*  
  
a) Feature: Conduit home page  
  
Scenario: Conduit home page  
Given I access conduit home page  
When all the articles are loaded  
Then I can see a list of 10 articles  
And each article displays an author, a title and a description
  
Feature: Article page  
Scenario: Article page  
Given I access conduit home page  
And all the articles are loaded  
When I click on the first article  
Then I am redirected to the article page  
And the article contains an author, a title and a description  
  
b) Feature: Sign up flow  

Scenario Outline: Sign up flow  
Given I access conduit home page  
And I click on Sign up link  
And I'm redirected to the register page  
And fill in the sign up form with `<username>`, `<email>` and `<password>`  
When I click on the sign up button
Then I'm redirected to the home page  
And `<username>` is successfully logged in  
  
Examples:  //in the actual test I'm using faker
| username | email          | password  |  
| user1    | user1@mail.com | password1 |  

Feature: Sign in flow
Scenario Outline: Sign in flow  
Given I access conduit home page  
And I click on Sign in link  
And I'm redirected to the login page  
And fill in the sign in credentials with `<email>` and `<password>`  
When I click on sign in button  
Then I'm redirected to the home page  
And `<username>` is successfully logged in  

Examples:  //in the actual test I'm using faker
| username | email          | password  |  
| user1    | user1@mail.com | password1 |  

c) New article and article publishing  

Scenario outline:  //in the actual test I'm using faker
Given I am logged in as `<email>`, `<password>` (use API to login)  
And I click on the New Article link  
And I'm redirected to the article editor page  
And I fill in the article `<title>`, `<summary>`, `<content>` and `<tags>`
When I click on Publish Article button
Then my article should be published (status 200)
And I should see my article on My Articles section (/@`<username>`/)

Examples:  
| username | email          | password  | title           | summary        | content                | tags      |  
| user1    | user1@mail.com | password1 | My 1st article! | brief article  | bla bla bla bla bla... | laserTag1 |  
  
3. Automate, using the framework or language you feel most comfortable with, the test
case that you consider the most important from each critical flow

*Answer:*  
I wrote the test cases using BDD and a Cucumber library on Cypress.  
The e2e tests are under /tests/integration/*.feature  
The steps are described in /step_definitions  
Each page tested is presented in /pages.  
I'm using the **Page Objects** pattern in the pages, listing all the page elements as objects.  
It facilitates reading the methods. It also provides better reusability and maintainability.  

***To run the tests (headless)***:  
API tests (backend): 'npm run api_tests'  
e2e tests (frontend): 'npm run e2e_tests'  
Or using Cypress interface: npm run cypress:open  

**Note**: there's a bug on my local Cypress where it makes it impossible to run 2 specs together (e.g.: "article_basics.feature" and "new_article.feature" could be grouped into a single "article.feature"). What happens: the first .visit() works fine, but the second .visit() keeps loading forever. I've looked online for a solution and I've tried cleaning cache and session storage between tests - with no success. To workaround this issue, I had separated each feature into a unique .feature file. This way we're avoiding flaky tests.
  
    
4. (optional) Bugs: I haven't identified any significant bugs on the application on the main flows I've tested and automated.  
I'd need a little more time to investigate the rest of the application and report the issues found.  
   
    
 5. (optional) Pipeline and report  
I've created a pipeline to run the tests - ***pipeline.js.yml***  
It installs the dependencies and runs the API and e2e tests.  
To see an example of a passing pipeline run: https://github.com/gdlzambiazzi/Raidiam/actions/runs/6915958262/job/18815487314  
The test results are **reported** in the link above. It is possible to see the results under "Run npm run api_tests" and "Run npm run e2e_tests".  
The next steps here would be to create test results artifacts (when having tests failing), download them and make them available as evidence / debugging.  


  
# **Task 3:**
### **Important:** the original Open Weather API asked on the task is NOT free (https://openweathermap.org/api/one-call-3). It requires a subscription.  
I'm using the current weather API available on https://openweathermap.org/current.  
  
I chose to use Cypress and js to develop the API tests.  
  
The API test file is under /cypress/tests/api_tests/openweather_api.cy.js  
  
To run the API tests, you can clone the project locally. Make sure to have Cypress and the project dependencies installed (npm install cypress / npm install).  
***To run the tests***:  
Headless: npm run api_tests - (see package.json to understand the scripts)  
Using Cypress interface: npm run cypress:open  
  
The baseURL is defined on cypress.config.js (https://api.openweathermap.org/data/2.5)  

I've used 3 different API endpoints on the tests:  
1- the main API (used on the 'before' hook) - /weather - uses **coordinates** to return current weather information. I chose to store the response of this request in a variable to reuse it on several test cases ('it' statements).  
The fixture files used on the 'before' hook load test data and the API-key used on the endpoints.  
2- /weather?q=${city},${countryCode} - this API uses a city name + country code to return weather information for that location. I haven't created test data for this case because I've only used it once.  
3- /forecast - this API uses coordinates and a timestamp count to return an aggregated list of weather information for that location.  
  
  
TODO: once I'm done with Task 2, I'll create a pipeline and run the API tests there together with the e2e tests.
