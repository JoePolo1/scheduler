/** Should book an interview! */

describe("Should book an interview", () => {

  beforeEach(() => {
    // Resets the db to default
    cy.request("GET", "/api/debug/reset");

    // visits Root and ensures Monday is contained in the page
    cy.visit("/");
    cy.contains("Monday");
  })

  // Visits the root of our web server
  it("should visit root", () => {

    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();
      // Enters their name
      cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
      // Chooses an interviewer
      cy.get("[alt='Sylvia Palmer']").click();

      // Clicks the save button
      cy.contains("Save").click();

      // Sees the booked appointment//
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
  }); 


  it("should edit an interview", () => {

    // Clicks on the "Edit" button in the first appointment
    cy.get("[alt=Edit]")
    .click({ force: true })

    // Clears existing name field and types in Joe Awesome
    cy.get("[data-testid=student-name-input]").clear()
    cy.get("[data-testid=student-name-input]").type("Joe Awesome");

    // Selects interviewer "Tori"
    cy.get("[alt='Tori Malcolm']").click();

    // Clicks the save button
    cy.contains("Save").click();

    // Sees the booked appointment with correct updated details//
    cy.contains(".appointment__card--show", "Joe Awesome");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {

    // Force clicks on the delete button
    cy.get("[alt=Delete]")
    .click({ force: true });

    // Validates confirmation page apepars
    cy.contains("Delete the appointment?");

    // Clicks on Confirm on the confirmation page
    cy.contains("Confirm").click();

    // Checks that the deleting status page appears then goes away
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    // Checks that the deleted appointment no longer appears
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });

});