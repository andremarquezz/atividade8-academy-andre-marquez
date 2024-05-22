import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { UserLoginPage } from "../pages/UserLoginPage";

const userLoginPage = new UserLoginPage();

Before(() => {
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
  cy.viewport("macbook-16");
  cy.intercept("POST", "/api/auth/login").as("authUser");
  cy.intercept("GET", "/api/users/**").as("getUser");
});

Given("que acessei a página de login", () => {
  userLoginPage.visit();
});

Given("que estou cadastrado", () => {
  cy.registerUser();
});

When("preencher o e-mail com um e-mail válido", () => {
  const email = Cypress.env("CURRENT_USER").email;

  userLoginPage.typeEmail(email);
});

When("preencher a senha com uma senha válida", () => {
  const password = Cypress.env("CURRENT_USER").password;

  userLoginPage.typePassword(password);
});

When("preencher a senha com uma senha inválida", () => {
  userLoginPage.typePassword("senhainvalida");
});

When("clicar no botão Login", () => {
  userLoginPage.clickSubmitButton();
});

When("preencher o e-mail com um e-mail inválido", () => {
  userLoginPage.typeEmail("e-mailinvalido");
});

When("não preencher o e-mail", () => {});

When("não preencher a senha", () => {});

Then("devo ser autenticado", () => {
  cy.wait("@authUser").then(() => {
    cy.wait(2000);
    cy.window().then((win) => {
      const sessionInfo = JSON.parse(
        win.sessionStorage.getItem("session-info")
      );
      expect(sessionInfo).to.be.an("object");
      expect(sessionInfo.state).to.have.property("accessToken");
      expect(sessionInfo.state.accessToken).to.be.a("string");
      expect(sessionInfo.state.accessToken).to.not.be.null;
      expect(sessionInfo.state.accessToken).to.not.be.empty;
    });
  });
});

Then("devo ser redirecionado para a página inicial", () => {
  cy.url().should("eq", "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/");
});

Then("devo ver a mensagem de erro 'Falha ao autenticar'", () => {
  const errorMessage = "Usuário ou senha inválidos.";
  userLoginPage
    .getModal()
    .should("be.visible")
    .and("contain.text", "Falha ao autenticar")
    .and("contain.text", errorMessage);
});

Then("devo ver a mensagem de erro informado que o e-mail é obrigatório", () => {
  const errorMessage = "Informe o e-mail";
  userLoginPage
    .getErrorEmailInput()
    .should("be.visible")
    .and("contain.text", errorMessage);
});

Then("devo ver a mensagem de erro informado que a senha é obrigatório", () => {
  const errorMessage = "Informe a senha";
  userLoginPage
    .getErrorPasswordInput()
    .should("be.visible")
    .and("contain.text", errorMessage);
});
