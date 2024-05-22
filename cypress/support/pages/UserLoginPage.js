export class UserLoginPage {
  emailInput = "input[name='email']";
  passwordInput = 'input[name="password"]';
  submitButton = "button.login-button";
  errorInput = ".input-error";
  modal = ".modal-body";
  URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login";

  visit() {
    cy.visit(this.URL);
  }

  typeEmail(email) {
    cy.get(this.emailInput).type(email);
  }

  typePassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  clickSubmitButton() {
    cy.get(this.submitButton).click();
  }

  getModal() {
    return cy.get(this.modal);
  }

  getErrorEmailInput() {
    return cy.get(this.emailInput).siblings(this.errorInput);
  }

  getErrorPasswordInput() {
    return cy.get(this.passwordInput).siblings(this.errorInput);
  }

  login(email, password) {
    this.typePassword(password);
    this.typeEmail(email);

    this.clickSubmitButton();
  }
}
