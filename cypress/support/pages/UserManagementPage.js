export class UserManagementPage {
  emailInput = "input[name='email']";
  nameInput = 'input[name="name"]';
  userType = 'select[name="type"] option:selected';
  passwordInput = 'input[name="password"]';
  confirmPasswordInput = 'input[name="confirmPassword"]';
  buttonSave = "button.account-save-button";
  buttonChangePassword = "button.account-password-button";
  modal = ".modal-body";
  managementUrl = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/account";
  logoutUrl = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/logout";

  visit() {
    cy.visit(this.managementUrl);
  }

  logout() {
    cy.visit(this.logoutUrl);
  }

  getNameInput() {
    return cy.get(this.nameInput);
  }

  getEmailInput() {
    return cy.get(this.emailInput);
  }

  getTypeUser() {
    return cy.get(this.userType);
  }

  getModal() {
    return cy.get(this.modal);
  }

  getPasswordInput() {
    return cy.get(this.passwordInput);
  }

  getConfirmPasswordInput() {
    return cy.get(this.confirmPasswordInput);
  }

  getErrorPasswordInput() {
    return cy.get(this.passwordInput).siblings(".input-error");
  }

  getErrorConfirmPasswordInput() {
    return cy.get(this.confirmPasswordInput).siblings(".input-error");
  }

  clickSaveButton() {
    cy.get(this.buttonSave).click();
  }

  clickChangePasswordButton() {
    cy.get(this.buttonChangePassword).click();
  }
}
