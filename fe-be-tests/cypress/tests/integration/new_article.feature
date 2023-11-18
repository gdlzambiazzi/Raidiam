Feature: New Article

  Scenario: create an article
    Given I access conduit home page
    And I sign in with default user
    And I click on the New Article link  
    And I'm redirected to the article editor page  
    And I fill in the article title, summary, content and tags
    When I click on Publish Article button
    Then my article should be published
    And I should see my article on My Articles section