export class UserRegistrationPage {
  nameInput = "input[name='name']";
  emailInput = "input[name='email']";
  passwordInput = 'input[name="password"]';
  confirmPasswordInput = 'input[name="confirmPassword"]';
  submitButton = "button.account-save-button";
  modal = ".modal-body";
  URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/register";

  visit() {
    cy.visit(this.URL);
  }
  typeName(name) {
    cy.get(this.nameInput).type(name);
  }

  typeEmail(email) {
    cy.get(this.emailInput).type(email);
  }

  typePassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  typeConfirmPassword(password) {
    cy.get(this.confirmPasswordInput).type(password);
  }

  getModal() {
    return cy.get(this.modal);
  }

  getErrorPasswordInput() {
    // cy.get(this.passwordInput).siblings('.input-error');
    cy.get('input[name="password"]').siblings(".input-error");
  }

  getErrorConfirmPasswordInput() {
    // cy.get(this.confirmPasswordInput).siblings('.input-error');
    cy.get('input[name="confirmPassword"]').siblings(".input-error");
  }

  clickSubmitButton() {
    cy.get(this.submitButton).click();
  }

  register(name, email, password) {
    this.typeName(name);
    this.typePassword(password);
    this.typeConfirmPassword(password);
    this.typeEmail(email);

    this.clickSubmitButton();
  }
}
