Feature: Sign up flow  

  Scenario: register and log in successfully  
    Given I access conduit home page  
    And I click on Sign up link  
    And I'm redirected to the register page  
    And fill in the sign up form with username, email and password
    When I click on the sign up button
    Then I'm redirected to the home page  
    And my user is successfully signed up  
