Feature: Article page

  Scenario: basic contents and article URL  
    Given I access conduit home page  
    And all the articles are loaded  
    When I click on the first article  
    Then I am redirected to the article page
    And the article contains an author, a title and a description  
