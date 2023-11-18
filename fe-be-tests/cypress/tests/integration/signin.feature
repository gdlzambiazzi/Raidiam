Feature: Sign in flow  

  Scenario: Sign in flow  
    Given I access conduit home page  
    And I have previously signed up  
    And I click on Sign in link  
    And I'm redirected to the login page  
    And fill in the sign in credentials with email and password  
    When I click on sign in button  
    Then I'm redirected to the home page  
    And my user is successfully signed in  