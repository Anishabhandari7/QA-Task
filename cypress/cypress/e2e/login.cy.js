describe('template spec', () => {
  it('passes', () => {
    // Visit the login page
    cy.visit('http://localhost/wordpress-6.4.1/wordpress/wp-login.php')

    // Enter username, password, and click the login button
    cy.get('#user_login').type('root')
    cy.get('#user_pass').type('Harekrishna@16108')
    cy.get('#wp-submit').click()
    // Wait for login to complete
    cy.wait(2000)

    // Assert that we are on the WordPress dashboard
    cy.url().should('include', '/wp-admin/')
    // Assert that the welcome message is present on the dashboard
    cy.contains('Welcome to WordPress!').should('exist');

    // Navigate to the Plugins page
    cy.get('.wp-menu-name').contains('Plugins').click();
    cy.wait(2000)

    // Add a new plugin
    cy.get('.wp-submenu-wrap').contains('Add New Plugin').click();

    // Search for Everest Forms
    cy.get('[placeholder="Search plugins..."]').type('Everest Forms').type('{enter}');
    cy.wait(5000);

    // Install Everest Forms
    cy.get('.plugin-card.plugin-card-everest-forms').find('.install-now').click();

    // Wait for installation to complete
    cy.wait(12000)

    // Activate Everest Forms
    cy.contains('a.button.activate-now', 'Activate').click();

    // Validate that we are on the correct page
    cy.url().should('include', '/wp-admin/plugins.php');

    // Validate that Everest Forms is installed
    cy.contains('.plugin-title', 'Everest Forms').should('exist');

    cy.contains('Welcome to Everest Forms').should('exist');
    cy.get('#TB_closeWindowButton').click();
    //logout
    cy.get('#wp-admin-bar-logout').click({force:true});
    cy.get('#wp-admin-bar-logout a').click();

  });
});           
