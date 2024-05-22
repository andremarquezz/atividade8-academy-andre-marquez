export class UserRegistrationPage {
  nameInput = "input[name='name']";
  emailInput = "input[name='email']";
  passwordInput = 'input[name="password"]';
  errorInput = ".input-error";
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
    return cy.get(this.passwordInput).siblings(this.errorInput);
  }

  getErrorConfirmPasswordInput() {
    return cy.get(this.confirmPasswordInput).siblings(this.errorInput);
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
