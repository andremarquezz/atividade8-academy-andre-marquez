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
  const email = faker.internet.email();
  const password = "123456";

  const apiUrl = Cypress.env("API_URL");

  cy.request("POST", `${apiUrl}/users`, { name, password, email })
    .as("RegisteringEmail")
    .then(() => {
      userRegistrationPage.typeEmail(email);
    });
});

When("preencher um nome válido", () => {
  const name = faker.person.fullName();
  Cypress.env("CURRENT_USER", { name });

  userRegistrationPage.typeName(name);
});

When("preencher um email válido", () => {
  const email = faker.internet.email();
  const currentUser = Cypress.env("CURRENT_USER");
  Cypress.env("CURRENT_USER", { ...currentUser, email });

  userRegistrationPage.typeEmail(email);
});

When("preencher uma senha válida {string}", (password) => {
  const currentUser = Cypress.env("CURRENT_USER");
  Cypress.env("CURRENT_USER", { ...currentUser, password });

  userRegistrationPage.typePassword(password);
});

When("confirmar a senha corretamente {string}", (password) => {
  userRegistrationPage.typeConfirmPassword(password);
});

When("preencher um email inválido {string}", (email) => {
  userRegistrationPage.typeEmail(email);
});

When("preencher o email {string}", () => {
  userRegistrationPage.typeEmail(email);
});

When("clicar no botão de Cadastrar", () => {
  userRegistrationPage.clickSubmitButton();
});

When("preencher a senha com uma senha inválida {string}", (password) => {
  Cypress.env("PASSWORD_INVALID", password);
  userRegistrationPage.typePassword(password);
});

When("confirmar a senha incorretamente", () => {
  const password = "123599742";
  userRegistrationPage.typeConfirmPassword(password);
});

When("não preencher a senha", () => {});

When("não preencher a confirmação de senha", () => {});

Then("o cadastro deve ser realizado com sucesso", () => {
  cy.wait(["@registerUser", "@authUser"]);

  cy.window().then((win) => {
    const sessionInfo = JSON.parse(
      win.sessionStorage.getItem("user-session-info")
    );
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
  });
});
Then("devo ver a mensagem de sucesso", () => {
  const successMessage = "Cadastro realizado!";

  userRegistrationPage
    .getModal()
    .should("be.visible")
    .and("contain.text", "Sucesso")
    .and("contain.text", successMessage);
});

Then(
  "devo ver a mensagem de erro informando que não foi possível cadastrar o usuário",
  () => {
    const errorMessage = "Não foi possível cadastrar o usuário.";

    userRegistrationPage
      .getModal()
      .should("be.visible")
      .and("contain.text", errorMessage);
  }
);

Then("o cadastro não deve ser realizado", () => {
  cy.get("@registerUser.all").should("have.length", 0);
});

Then("devo ver a {string} no campo de senha", (errorMessage) => {
  userRegistrationPage
    .getErrorPasswordInput()
    .should("be.visible")
    .and("contain.text", errorMessage);

  userRegistrationPage
    .getErrorConfirmPasswordInput()
    .should("be.visible")
    .and("contain.text", errorMessage);
});

Then(
  "devo ver a mensagem de erro informando que as senhas devem ser iguais",
  () => {
    const errorMessage = "As senhas devem ser iguais.";

    userRegistrationPage
      .getErrorConfirmPasswordInput()
      .should("be.visible")
      .and("contain.text", errorMessage);
  }
);

Then(
  "devo ver a mensagem de erro informando que o e-mail já está cadastrado.",
  () => {
    const errorMessage = "E-mail já cadastrado. Utilize outro e-mail";

    userRegistrationPage
      .getModal()
      .should("be.visible")
      .and("contain.text", "Falha no cadastro.")
      .and("contain.text", errorMessage);
  }
);

Then("devo ver a mensagem de erro informando que a senha é obrigatória", () => {
  const errorMessage = "Informe a senha";

  userRegistrationPage
    .getErrorPasswordInput()
    .should("be.visible")
    .and("contain.text", errorMessage);
});

Then(
  "devo ver a mensagem de erro informando que a confirmação de senha é obrigatória",
  () => {
    const errorMessage = "Informe a senha";

    userRegistrationPage
      .getErrorConfirmPasswordInput()
      .should("be.visible")
      .and("contain.text", errorMessage);
  }
);
