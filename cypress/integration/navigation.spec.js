
/** My first Cypress test! */
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.get("[data-testid=day]").contains("Tuesday").click();
    cy.get("li")
  .contains("[data-testid=day]", "Tuesday")
  .should("have.class", "day-list__item--selected");
  });

  
});