import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { UserRegistrationPage } from "../pages/UserRegistrationPage";

const userRegistrationPage = new UserRegistrationPage();

Before(() => {
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
  cy.viewport("macbook-16");
  cy.intercept("POST", "/api/users").as("registerUser");
  cy.intercept("POST", "/api/auth/login").as("authUser");
});

Given("que acessei a página de cadastro", () => {
  userRegistrationPage.visit();
});

When("preencher um email já cadastrado", () => {
  const name = faker.person.fullName();
  const password = "123456";
  const email = faker.internet.email();

  const apiUrl = Cypress.env("API_URL");

  cy.request("POST", `${apiUrl}/users`, { name, password, email })
    .as("RegisteringEmail")
    .then(() => {
      userRegistrationPage.typeEmail(email);
    });
});

When(
  "preencher um nome válido, um email válido, uma senha válida e confirmar a senha corretamente",
  () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = "123456";

    Cypress.env("CURRENT_USER", { name, email, password });

    userRegistrationPage.register(name, email, password);
  }
);

When("preencher um nome válido", () => {
  const name = faker.person.fullName();
  userRegistrationPage.typeName(name);
});

When("preencher um email válido", () => {
  const email = faker.internet.email();
  userRegistrationPage.typeEmail(email);
});

When("preencher um email inválido {string}", (email) => {
  userRegistrationPage.typeEmail(email);
});

When("preencher o email {string}", () => {
  userRegistrationPage.typeEmail(email);
});

When(
  "preencher os campos de senha e confirmação de senha com uma senha inválida {string}",
  (password) => {
    userRegistrationPage.typePassword(password);
    userRegistrationPage.typeConfirmPassword(password);
  }
);

When("preencher uma senha válida e confirmar a senha corretamente", () => {
  const password = "123456";
  userRegistrationPage.typePassword(password);
  userRegistrationPage.typeConfirmPassword(password);
});

When("clicar no botão de Cadastrar", () => {
  userRegistrationPage.clickSubmitButton();
});

When("preencher uma senha válida e confirmar a senha incorretamente", () => {
  const password = "123456";
  const confirmPassword = "1234567";

  userRegistrationPage.typePassword(password);
  userRegistrationPage.typeConfirmPassword(confirmPassword);
});

Then(
  "o cadastro deve ser realizado com sucesso e devo ver a mensagem de sucesso",
  () => {
    cy.wait("@registerUser");
    cy.wait("@authUser");

    const sessionInfo = JSON.parse(sessionStorage.getItem("user-session-info"));
    const currentUser = Cypress.env("CURRENT_USER");

    expect(sessionInfo).to.have.property("state");
    expect(sessionInfo.state).to.have.property("user");
    expect(sessionInfo.state.user).to.have.property("id");
    expect(sessionInfo.state.user.id).to.be.a("number");
    expect(sessionInfo.state.user).to.deep.include({
      name: currentUser.name,
      email: currentUser.email,
      type: 0,
      active: true,
    });

    const successMessage = "Cadastro realizado!";

    userRegistrationPage
      .getModal()
      .should("be.visible")
      .and("contain.text", "Sucesso")
      .and("contain.text", successMessage);
  }
);

Then("devo ver a mensagem de erro {string}", (errorMessage) => {
  userRegistrationPage
    .getModal()
    .should("be.visible")
    .and("contain.text", errorMessage);
});

Then(
  "o cadastro não deve ser realizado e devo ver a mensagem de erro {string}",
  (errorMessage) => {
    cy.get('input[name="password"]')
      .siblings(".input-error")
      .should("be.visible")
      .and("contain.text", errorMessage);

    cy.get('input[name="confirmPassword"]')
      .siblings(".input-error")
      .should("be.visible")
      .and("contain.text", errorMessage);
  }
);

Then(
  "o cadastro não deve ser realizado e devo ver a mensagem que as senhas devem ser iguais.",
  () => {
    const errorMessage = "As senhas devem ser iguais.";

    userRegistrationPage
      .getErrorConfirmPasswordInput()
      .should("be.visible")
      .and("contain.text", errorMessage);
  }
);

Then(
  "o cadastro não deve ser realizado e devo ver a mensagem de erro que o e-mail já esta cadastrado",
  () => {
    const errorMessage = "E-mail já cadastrado. Utilize outro e-mail";

    userRegistrationPage
      .getModal()
      .should("be.visible")
      .and("contain.text", "Falha no cadastro.")
      .and("contain.text", errorMessage);
  }
);
