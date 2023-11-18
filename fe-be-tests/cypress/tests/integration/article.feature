Feature: Article page

  Scenario: basic contents and article URL  
    Given I access conduit home page  
    And all the articles are loaded  
    When I click on the first article  
    Then I am redirected to the article page
    And the article contains an author, a title and a description  

  Scenario: create an article
    Given I have previously signed up
    And I access conduit home page  
    And I click on Sign in link  
    And I'm redirected to the login page  
    And fill in the sign in credentials with email and password  
    And I click on sign in button  
    And I'm redirected to the home page  
    #And I click on the New Article link  
    #And I'm redirected to the article editor page  
    #And I fill in the article `<title>`, `<summary>`, `<content>` and `<tags>`
    #When I click on Public Article button
    #Then my article should be published (status 200)
    #And I should see my article on My Articles section (/@`<username>`/)