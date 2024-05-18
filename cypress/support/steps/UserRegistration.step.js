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

When(
  "preencher um nome válido, um email válido e confirmar a senha corretamente",
  () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = "123456";

    Cypress.env("CURRENT_USER", { name, email, password });

    userRegistrationPage.register(name, email, password);
  }
);

Then(
  "o cadastro deve ser realizado com sucesso e devo ver a mensagem de sucesso",
  () => {
    cy.wait("@registerUser");
    cy.wait("@authUser");

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

    userRegistrationPage
      .getModal()
      .should("be.visible")
      .and("contain.text", "Cadastro realizado!");
  }
);
