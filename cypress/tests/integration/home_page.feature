Feature: Conduit home page

  Scenario: basic contents and articles list  
    Given I access conduit home page  
    When all the articles are loaded  
    Then I can see a list of 10 articles  
    And each article displays an author, a title and a description
  