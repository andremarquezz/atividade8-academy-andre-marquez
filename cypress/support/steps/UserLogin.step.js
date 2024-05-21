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

When("preencher o email com um e-mail válido", () => {
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

When("preencher o email com um e-mail inválido", () => {
  userLoginPage.typeEmail("emailinvalido");
});

Then("devo ser autenticado e ser redirecionado para a página inicial", () => {
  cy.wait("@authUser").then(() => {
    cy.window().then((win) => {
      const sessionInfo = JSON.parse(
        win.sessionStorage.getItem("session-info")
      );

      expect(sessionInfo).to.be.an("object");
      expect(sessionInfo.state).to.have.property("accessToken");
      expect(sessionInfo.state.accessToken).to.be.a("string");
      expect(sessionInfo.state.accessToken).to.not.be.null;
      // expect(sessionInfo.state.accessToken).to.not.be.empty;
    });
  });

  cy.url().should("eq", "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/");
});

Then("devo ver a mensagem de erro falha ao autenticar", () => {
  const errorMessage = "Usuário ou senha inválidos.";
  userLoginPage
    .getModal()
    .should("be.visible")
    .and("contain.text", "Falha ao autenticar")
    .and("contain.text", errorMessage);
});
